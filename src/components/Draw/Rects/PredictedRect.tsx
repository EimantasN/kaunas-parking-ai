import React, { Component } from 'react';
import { Rect } from 'react-konva';

interface IPredictedRectProps {
    x: number,
    y: number,
    width: number,
    height: number,
    value: number,
    confidence: number,
    activeKey: string,
    active: boolean,
    displayText(activeKey: string, text: string): void
  }
  
  interface IPredictedRectState {
    color: string,
    selected: boolean
  }
  
  export default class PredictedRect extends Component<IPredictedRectProps, IPredictedRectState> {
    state = {
      color: 'green',
      selected: false
    };

    render() {
      return <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        stroke= {this.props.active ? 'red' : 'green'}
        strokeWidth={this.props.value > this.props.confidence ? 4 : 1}
        shadowBlur={this.props.value > this.props.confidence ? 4 : 1}
        onClick={this.handleClick}
      />;
    }

    private handleClick = () => {
      var text = `Status: (${this.props.value ?? 0})`;
      if (this.props.confidence < this.props.value) {
        text = `${text} occupied`;
      } else {
        text = `${text} empty`;
      }
      this.props.displayText(this.props.activeKey, text);
    };
}