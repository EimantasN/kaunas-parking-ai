import React, { Component } from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';
import { RectRemoved } from '../DrawAnnotations';

interface IDrawedRectProps {
    index: string,
    x: number,
    y: number,
    width: number,
    height: number,
    stateValid: boolean,
    removed: RectRemoved
  }
  
  export default class DrawedRect extends Component<IDrawedRectProps, {}> {  
    handleClick = () => {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    };
  
    render() {
        return (
            <Rect
            key={this.props.index}
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height}
            strokeWidth={2}
            shadowBlur={2}
            fill="transparent"
            stroke={this.props.stateValid ? 'green' : 'red' }
            onClick={this.handleClick}
            onDblClick={() => {  
                this.props.removed(this.props.index);
                }}
            />
        );
    }
  }