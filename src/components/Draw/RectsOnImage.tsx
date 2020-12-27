import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { MRCnnClient, MRCnnResponse } from '../Api/api';
import Img from './Img';

interface IColoredRectProps {
  x: number,
  y: number,
  width: number,
  height: number,
}

interface IColoredRectState {
  color: string,
  selected: boolean
}

class ColoredRect extends React.Component<IColoredRectProps, IColoredRectState> {
  state = {
    color: 'green',
    selected: false
  };

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor(),
      selected: !this.state.selected
    });
  };

  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        stroke= {this.state.selected ? 'green' : 'red'}
        strokeWidth={this.state.selected ? 2 : 0.2}
        shadowBlur={2}
        onClick={this.handleClick}
      />
    );
  }
}

interface IRectsOnImageProps {
  model?: MRCnnResponse,
  url: string,
  scale: number
}

export default class RectsOnImage extends Component<IRectsOnImageProps> {

  public getRects(response: MRCnnResponse | undefined): any[] {
    const rects: any[] = [];
    response?.rects?.forEach((el) => {
      rects.push(<ColoredRect 
        x={(el.x ?? 0) * this.props.scale}
        y={(el.y ?? 0) * this.props.scale}
        width={(el.width ?? 0) * this.props.scale}
        height={(el.height ?? 0) * this.props.scale}
      />);
    });
    console.log('rects');
    return rects;
  }

  render() {
    const width = ((this.props.model?.width ?? 0) * this.props.scale);
    const height = ((this.props.model?.height ?? 0) * this.props.scale);
    return (
      <Stage width={width} height={height}>
        <Layer width={width} height={height}>
          <Img 
            src={this.props.url} 
            width={width} 
            height={height} 
            space="fill"/>
          {this.getRects(this.props.model)}
        </Layer>
      </Stage>
    );
  }
}