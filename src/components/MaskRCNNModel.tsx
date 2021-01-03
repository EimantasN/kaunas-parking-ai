import * as React from 'react';
import Stats from './Stats';
import { Radio, Spin, Slider } from 'antd';
import DrawAnnotations from './Draw/DrawAnnotations';
import RectsOnImage from './Draw/RectsOnImage';
import MaskRCNNModelState from './Models/MaskRCNNModelState';
import IMaskRCNNModelState from './Models/Interfaces/IMaskRCNNModelState';

export interface IMaskRCNNModelProps {
}

export default class MaskRCNNModel extends React.Component<IMaskRCNNModelProps, IMaskRCNNModelState> {
  public refresh: number = 0.5;
  public timer?: NodeJS.Timeout | undefined;
  public active: boolean = true;
  
  private stateObject = new MaskRCNNModelState();

  constructor(props: IMaskRCNNModelProps) {
    super(props);
    this.state = new MaskRCNNModelState()
  }

  public async componentDidMount() {
    this.setState({...await this.stateObject.load()});
    this.setState({...await this.stateObject.update()});
    this.timer = setInterval(async () => {
      if (this.active) {
        this.setState({...await this.stateObject.update()});
      }
    }, this.refresh * 1000);
  }

  public componentWillUnmount() {
    this.active = false;
    this.timer = undefined;
  }

  public onChange = async (e: any) => {
    this.setState({loading: true});
    this.setState({...await this.stateObject.active(e.target.value)});
  };

  private getOptions(): typeof Radio[] {
    const arr: any[] = [];
    for (var i = 0; i < this.stateObject.Sources.length; i++) {
      arr.push(<Radio key={i} value={this.stateObject.Sources[i].id}>{i}</Radio>);
    }
    return arr;
  }

  public render() {
    const prediction = this.stateObject.show()
      ? <RectsOnImage 
          model={this.state.model}
          scale={this.state.scale}
          lastUpdate={this.state.lastUpdate}
          confidence={this.state.confidence}
          url={this.stateObject.getImageUrl()}
        />
      : <h2>Model Unavailable</h2>;
    const selection = this.stateObject.show()
      ? <DrawAnnotations 
          url={this.stateObject.getImageUrl()}
          scale={this.state.scale}
          lastUpdate={this.state.lastUpdate}
          width={this.state.model?.width ?? 0}
          height={this.state.model?.height ?? 0}
          sourceId={this.state.currentSource}
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
            <p>Time {this.state.model?.miliseconds + ' ms '} 
              / Active {this.state.model?.working + ' '}
              / Available {this.state.model?.online + ''}</p>
          </div>
        </div>
        <div className="playerContainer">
          <div className="player">
            <Radio.Group 
              onChange={this.onChange} 
              value={this.state.currentSource}>
              {this.getOptions()}
            </Radio.Group>
          </div>
        </div>
        <p></p>
        <br></br>
        <div className="playerContainer">
          <div className="player" style={{
            paddingBottom: '50px'
          }}>
            <p>Confidence level</p>
            <Slider defaultValue={this.state.confidence} 
            onChange={async (value: number) => {
                this.setState({...await this.stateObject.setConf(value)});
              }
            } />
          <p></p>
            {prediction}
            {selection}
            {loading}
          </div>
        </div>
      </div>
    );
  }
}