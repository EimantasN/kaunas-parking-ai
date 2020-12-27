import * as React from 'react';
import { DetectionClient, MRCnnClient, MRCnnResponse } from './Api/api';
import Stats from './Stats';
import { Radio } from 'antd';
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
    timer?: NodeJS.Timeout | undefined,
    getBaseUrl(): string
}

export default class MaskRCNNModel extends React.Component<IMaskRCNNModelProps, IMaskRCNNModelState> {
  public refresh: number = 5;
  public Client: MRCnnClient = new MRCnnClient();

  private baseUlrOptions: string[] = [
    'http://80.34.181.34:85/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&',
    'http://118.220.7.47:8000/webcapture.jpg?command=snap&channel=1?',
    'http://218.217.95.45:60001/cgi-bin/snapshot.cgi?chn=0&u=admin&p=&q=0&'
  ];

  constructor(props: IMaskRCNNModelProps) {
    super(props);

    this.state = {
        count: 10,
        free: 10,
        currentSource: 1,
        unixTime: `${Math.round(Date.now() / 1000)}`,
        lastUpdate: new Date(),
        getBaseUrl: () => {
          return `${this.baseUlrOptions[this.state.currentSource]}${this.state.unixTime}`;
        }
    }
  }

  public onChange = (e: any) => {
    this.setState({currentSource: e.target.value});
    this.update();
  };

  private getOptions(): typeof Radio[] {
    const arr: any[] = [];
    for (var i = 0; i < this.baseUlrOptions.length; i++) {
      arr.push(<Radio key={i} value={i}>{i}</Radio>);
    }

    return arr;
  }

  componentDidMount() {
    this.update();
    this.setState({timer: setInterval(async () => {
        this.update();
    }, this.refresh * 1000)});
  }

  public render() {
    return (
      <div>
        <Stats 
            count={this.state?.count ?? 0}
            free={this.state?.free ?? 0}
            lastUpdate={this.state?.lastUpdate ?? new Date()}
        />
        <div className="playerContainer">
          <div className="player">
            <Radio.Group onChange={this.onChange} value={this.state.currentSource}>
              {this.getOptions()}
            </Radio.Group>
          </div>
        </div>
        <br></br>
        <div className="playerContainer">
          <div className="player">
            <RectsOnImage 
              model={this.state.model}
              scale={0.5}
              url={this.state.getBaseUrl()}
            />
            {/* <img style={{
                minHeight: '330px',
                maxHeight: '500px',
              }} 
              placeholder="https://img.icons8.com/ios/452/no-image.png"
              alt="rcnn detection img" 
              src={this.state.getBaseUrl()}></img> */}
          </div>
        </div>
        <p>{this.state.unixTime}</p>
      </div>
    );
  }

  public async update() {
    const response = await this.Client.predict();
    this.setState({
        model: response,
        unixTime: `${Math.round(Date.now() / 1000)}`,
        lastUpdate: new Date(),
        count: response.total ?? 0,
        free: response.free ?? 0
    });
  }
}
