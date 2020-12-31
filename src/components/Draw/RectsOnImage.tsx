import { Button } from 'antd';
import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import { MRCnnResponse } from '../Api/api';
import Img from './Img';
import PredictedRect from './Rects/PredictedRect';
import SelectedRect from './Rects/SelectedRect';
import { Slider, Switch } from 'antd';

interface IRectsOnImageProps {
  model?: MRCnnResponse,
  url: string,
  scale: number
}

interface IRectsOnImageState {
  suggestions: boolean,
  predictions: boolean,
  confidence: number
}

export default class RectsOnImage extends Component<IRectsOnImageProps, IRectsOnImageState> {

  constructor(props: IRectsOnImageProps) {
    super(props);

    this.state = {
      suggestions: false,
      predictions: false,
      confidence: 50
    }
  }

  public getSuggestios(response: MRCnnResponse | undefined): any[] {
    const rects: any[] = [];
    response?.rects?.forEach((el) => {
      rects.push(<SelectedRect 
        x={(el.x ?? 0) * this.props.scale}
        y={(el.y ?? 0) * this.props.scale}
        width={(el.width ?? 0) * this.props.scale}
        height={(el.height ?? 0) * this.props.scale}
      />);
    });
    return rects;
  }

  public getWatched(response: MRCnnResponse | undefined): any[] {
    const rects: any[] = [];
    if (response) {
      response.result.forEach((el, index) => {
        rects.push(<PredictedRect 
          x={(el.x ?? 0) * this.props.scale}
          y={(el.y ?? 0) * this.props.scale}
          width={(el.width ?? 0) * this.props.scale}
          height={(el.height ?? 0) * this.props.scale}
          value={response.detected[index]}
          confidence={this.state.confidence / 100}
        />);
      });
    }
    return rects;
  }

  render() {
    const { suggestions, predictions } = this.state;
    const width = ((this.props.model?.width ?? 0) * this.props.scale);
    const height = ((this.props.model?.height ?? 0) * this.props.scale);
    return (
      <>
      <div>
        <p>Confidence level</p>
        <Slider defaultValue={this.state.confidence} onChange={(value: number) => this.setState({confidence: value })} />
        <p></p>
        <Button type="dashed" onClick={() => {
          this.setState({suggestions: !this.state.suggestions});
        }}>Show Suggestions</Button>
        <Button type="primary" onClick={() => {
          this.setState({predictions: !this.state.predictions});
        }}>Predictions</Button>
      </div>
      <p></p>
      <Stage width={width} height={height}>
        <Layer width={width} height={height}>
          <Img 
            src={this.props.url} 
            width={width} 
            height={height} 
            space="fill"/>
          {predictions ? this.getWatched(this.props.model) : null}
          {suggestions ? this.getSuggestios(this.props.model) : null}
        </Layer>
      </Stage>
      <p></p>
      </>
    );
  }
}