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

const scale: number = 0.5;

class RectsOnImage extends Component {

  public Client: MRCnnClient = new MRCnnClient();
  
  state = {
    width: (1920 * scale),
    height: (1080 * scale),
    rects: []
  }

  async componentDidMount() {
    var predict = await this.Client.predict();
console.log(((predict.width ?? 0) / scale))
    this.setState({
      width: ((predict.width ?? 0) * scale), 
      height: (predict.height ?? 0) * scale,
      rects: this.getRects(predict)
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  public getRects(response: MRCnnResponse | undefined): any[] {
    const rects: any[] = [];
    if (response) {
      response.rects?.forEach((el) => {
        rects.push(<ColoredRect 
          x={(el.x ?? 0) * scale}
          y={(el.y ?? 0) * scale}
          width={(el.width ?? 0) * scale}
          height={(el.height ?? 0) * scale}
        />);
      });
    }
    return rects;
  }

  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer width={this.state.width} height={this.state.height}>
          <Img 
            src={'http://118.220.7.47:8000/webcapture.jpg?command=snap&channel=1?1609097577'} 
            width={this.state.width} 
            height={this.state.height} 
            space="fill"/>
          {/* <ColoredRect 
            x={0}
            y={0}
            width={this.state.width}
            height={this.state.height}
          /> */}
          {this.state.rects}
        </Layer>
      </Stage>
    );
  }
}

export default RectsOnImage;