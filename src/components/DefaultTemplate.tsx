import * as React from 'react';
import { AnalyzeObject, DetectionClient, IMatch } from './Api/api';
import Player from './Player';
import Stats from './Stats';
import TableContainer from './TableContainer';
import Uploader from './Uploader';

export interface IDefaultTemplateProps {
}

export interface IDefaultTemplateState {
    count: number,
    free: number,
    lastUpdate: Date,
    mathes: IMatch[],
    timer: NodeJS.Timeout | undefined
}

export default class DefaultTemplate extends React.Component<IDefaultTemplateProps, IDefaultTemplateState> {
  public refresh: number = 3;
  public Client: DetectionClient = new DetectionClient();

  componentDidMount() {
      this.update();
      this.setState({timer: setInterval(async () => {
          this.update();
      }, this.refresh * 1000)})
  }

  componentWillUnmount() {
      if (this.state?.timer) {
          clearTimeout(this.state.timer);
      }
  }

  public render() {
    return (
      <div>
        <Stats 
            count={this.state?.count ?? 0}
            free={this.state?.free ?? 0}
            lastUpdate={this.state?.lastUpdate ?? new Date()}
        />
        <Player/>
        <Uploader />
        <TableContainer Matches={this.state?.mathes ?? []}/>
      </div>
    );
  }

  public async update() {
    const result: AnalyzeObject = await this.Client.detect();

    this.setState({
        count: result.totalCount ?? 0,
        free: (result.totalCount ?? 0) - (result.detected ?? 0),
        lastUpdate: new Date(),
        mathes: result.matches ?? []
    });
}
}
