import React, { Component } from 'react';
import { Rect, Group, Text } from 'react-konva';
import Konva from 'konva';

interface IPredictedRectProps {
    x: number,
    y: number,
    width: number,
    height: number,
    value: number,
    confidence: number
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
  
    handleClick = () => {
      this.setState({
        color: Konva.Util.getRandomColor(),
        selected: !this.state.selected
      });
    };
  
    render() {
      return (
          <Group
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height}
          >
            <Rect
                width={this.props.width}
                height={this.props.height}
                stroke= {'green'}
                strokeWidth={this.props.value > this.props.confidence ? 1 : 4}
                shadowBlur={this.props.value > this.props.confidence ? 1 : 4}
                onClick={this.handleClick}
                onDblClick={() => { console.log('remove')}}
            />
            <Text 
                width={this.props.width}
                height={this.props.height}
                text={ this.props.value > this.props.confidence ? this.props.value + '' : "FREE"}
                color={'green'}
                fill={'green'}
                padding={5}
                fontFamily={'Calibri'}
                fontSize={this.calculateTextSize()}
                align={'right'}
                verticalAlign={'left'}
            />
          </Group>
      );
    }

    private calculateTextSize(): number {
      const byWidth = this.props.width / 4;
      const byHeight =  this.props.height / 4;
      return Math.min(byWidth, byHeight);
    }
  }