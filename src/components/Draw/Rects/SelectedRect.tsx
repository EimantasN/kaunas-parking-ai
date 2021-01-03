import React, { Component } from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';

interface ISelectedRectProps {
    x: number,
    y: number,
    width: number,
    height: number,
  }
  
  interface ISelectedRectState {
    color: string,
    selected: boolean
  }
  
  export default class SelectedRect extends Component<ISelectedRectProps, ISelectedRectState> {
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