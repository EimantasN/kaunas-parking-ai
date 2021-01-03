import { Button } from 'antd';
import React, { Component } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { MRCnnResponse } from '../Api/api';
import Img from './Img';
import PredictedRect from './Rects/PredictedRect';
import SelectedRect from './Rects/SelectedRect';

interface IRectsOnImageProps {
  model?: MRCnnResponse,
  url: string,
  scale: number,
  confidence: number,
  lastUpdate: Date
}

interface IRectsOnImageState {
  suggestions: boolean,
  predictions: boolean,
  activeKey: string,
  currentValue: string | null
}

export default class RectsOnImage extends Component<IRectsOnImageProps, IRectsOnImageState> {

  constructor(props: IRectsOnImageProps) {
    super(props);

    this.state = {
      suggestions: false,
      predictions: true,
      activeKey: '',
      currentValue: null
    }
  }

  public getSuggestions(response: MRCnnResponse | undefined): any[] {
    const rects: any[] = [];
    response?.rects?.forEach((el) => {
      rects.push(<SelectedRect
        key={`${el.width}${el.height}${el.x}${el.y}`}
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
    if (response && response.result && response.detected) {
      response.result.forEach((el, index) => {
        const key = `${el.width}${el.height}${el.x}${el.y}`;
        rects.push(<PredictedRect
          key={key}
          activeKey={key}
          x={(el.x ?? 0) * this.props.scale}
          y={(el.y ?? 0) * this.props.scale}
          width={(el.width ?? 0) * this.props.scale}
          height={(el.height ?? 0) * this.props.scale}
          value={response.detected !== undefined ? response.detected[index] : 0}
          confidence={this.props.confidence / 100}
          active={key === this.state.activeKey}
          displayText={(key, text) => {
            this.setState({
              activeKey: key,
              currentValue: text
            });
          }}
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
            space="fill"
            lastUpdate={this.props.lastUpdate}/>
          {predictions ? this.getWatched(this.props.model) : null}
          {suggestions ? this.getSuggestions(this.props.model) : null}
          <Text 
            width={250}
            height={25}
            text={this.state.activeKey ? this.state.currentValue ?? '' : ''}
            color={'green'}
            fill={'red'}
            padding={5}
            fontFamily={'Calibri'}
            fontSize={18}
            align={'left'}
            verticalAlign={'center'}
          />
        </Layer>
      </Stage>
      <p></p>
      </>
    );
  }
}