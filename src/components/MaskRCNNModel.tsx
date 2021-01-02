import * as React from 'react';
import { ModelControlClient, MRCnnClient, MRCnnResponse, StreamSource } from './Api/api';
import Stats from './Stats';
import { Radio, Spin } from 'antd';
import DrawAnnotations from './Draw/DrawAnnotations';
import RectsOnImage from './Draw/RectsOnImage';

export interface IMaskRCNNModelProps {
}

export interface IMaskRCNNModelState {
    model?: MRCnnResponse,
    count: number,
    free: number,
    currentSource: number,
    unixTime: string,
    lastUpdate: Date,
    loading: boolean,
    scale: number,
    timer?: NodeJS.Timeout | undefined,
    getBaseUrl(): string
}

export default class MaskRCNNModel extends React.Component<IMaskRCNNModelProps, IMaskRCNNModelState> {
  public refresh: number = 3;
  public Client: MRCnnClient = new MRCnnClient();
  public ControlClient: ModelControlClient = new ModelControlClient();

  private Sources: StreamSource[];

  constructor(props: IMaskRCNNModelProps) {
    super(props);

    this.Sources = [];
    this.state = {
        count: 10,
        free: 10,
        loading: true,
        currentSource: -1,
        unixTime: `${Math.round(Date.now() / 1000)}`,
        lastUpdate: new Date(),
        scale: 1,
        getBaseUrl: () => {
          return `${this.Sources[this.state.currentSource]?.url ?? ''}`;
        }
    }
  }

  public async componentDidMount() {
    this.Sources = await this.ControlClient.sources();
    await this.update();
    this.setState({timer: setInterval(async () => {
        await this.update();
    }, this.refresh * 1000)});
  }

  public onChange = async (e: any) => {
    const source = this.Sources[e.target.value];
    if (source && source.id) {
      await this.ControlClient.active(source.id);
      this.setState({
        currentSource: e.target.value,
        loading: true,
      });
    }
  };

  private getOptions(): typeof Radio[] {
    const arr: any[] = [];
    for (var i = 0; i < this.Sources.length; i++) {
      arr.push(<Radio key={i} value={i}>{i}</Radio>);
    }

    return arr;
  }

  public render() {
    const prediction = this.Sources[this.state.currentSource]?.id && !this.state.loading
      ? <RectsOnImage 
          model={this.state.model}
          scale={this.state.scale}
          lastUpdate={this.state.lastUpdate}
          url={this.Sources[this.state.currentSource]?.url + this.state.unixTime ?? ''}
        />
      : null;
    const selection = this.Sources[this.state.currentSource]?.id && !this.state.loading
      ? <DrawAnnotations 
          url={this.Sources[this.state.currentSource]?.url + this.state.unixTime ?? ''}
          scale={this.state.scale}
          lastUpdate={this.state.lastUpdate}
          width={this.state.model?.width ?? 0}
          height={this.state.model?.height ?? 0}
          sourceId={this.Sources[this.state.currentSource]?.id ?? 0}
        />
      : null;
    const loading = this.state.loading 
      ? <Spin tip="Loading..."></Spin> 
      : null;
    return (
      <div>
        <Stats 
            count={this.state?.count ?? 0}
            free={this.state?.free ?? 0}
            lastUpdate={this.state?.lastUpdate ?? new Date()}
        />
        <div className="playerContainer">
          <div className="player">
            <Radio.Group 
              onChange={this.onChange} 
              value={this.state.currentSource}>
              {this.getOptions()}
            </Radio.Group>
          </div>
        </div>
        <br></br>
        <div className="playerContainer">
          <div className="player" style={{
            paddingBottom: '50px'
          }}>
            {prediction}
            {selection}
            {loading}
          </div>
        </div>
      </div>
    );
  }

  private getScale(model?: MRCnnResponse): number {
    if (model 
        && model?.width 
        && model?.height) {
        const byWidth = (100 * 800) / model.width;
        return byWidth / 100;
    } else {
      return 1;
    }
  }

  public async update() {
    const response = await this.Client.predict();
    const currentSource = this.state.currentSource === -1 
      ? this.Sources.findIndex(x => x.active === true)
      : this.state.currentSource;

    if (response.sourceId !== this.Sources[currentSource]?.id) {
      return;
    }
    this.setState({
        model: response,
        currentSource: currentSource,
        loading: this.isLoading(),
        unixTime: `${Math.round(Date.now() / 1000)}`,
        lastUpdate: new Date(),
        count: response.total ?? 0,
        free: response.free ?? 0,
        scale: this.getScale(response)
    });
  }

  private isLoading(): boolean {
    if (!this.state.model) {
      return true;
    }
    if (!this.state.model.sourceId) {
      return true;
    }
    const sourceIndex = this.Sources.findIndex(x => x.id === this.state?.model?.sourceId);
    if (sourceIndex < 0) {
      return true;
    }
    if (this.state.model.sourceId !== this.Sources[this.state.currentSource].id) {
      return true;
    }
    return false;
  }
}
