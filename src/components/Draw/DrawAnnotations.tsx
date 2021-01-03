import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import Img from './Img';
import DrawedRect from "./Rects/DrawedRect";
import { Button } from 'antd';
import { ModelControlClient, Rect } from "../Api/api";;

interface IDrawAnnotationsState {
  annotations: Annotation[],
  newAnnotation: Annotation[],
  data: Annotation[],
  lastSourceId: number,
  show: boolean
}

interface IDrawAnnotationsProps {
  url: string,
  width: number,
  height: number,
  scale: number,
  sourceId: number,
  lastUpdate: Date
}

interface Annotation {
  key: string,
  x: number,
  y: number,
  width: number,
  height: number
}

export interface RectRemoved { (key: string): void }

export default class DrawAnnotations extends Component<IDrawAnnotationsProps, IDrawAnnotationsState> {

  private Client: ModelControlClient = new ModelControlClient();

  private static index = 0;

  private static getIndex(): string {
    DrawAnnotations.index++;
    return DrawAnnotations.index + '';
  }

  constructor(props: IDrawAnnotationsProps) {
    super(props);

    this.state = {
      annotations: [],
      newAnnotation: [],
      data: [],
      lastSourceId: 0,
      show: false
    }
  }
  
  public handleMouseDown = (event: any) => {
  const { newAnnotation } = this.state;
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      this.setState({ newAnnotation: [{ x, y, width: 0, height: 0, key: DrawAnnotations.getIndex() }]});
    }
  };

  public handleMouseUp = (event: any) => {
    const { annotations, newAnnotation } = this.state;

    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd: Annotation = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: DrawAnnotations.getIndex()
      };
      annotations.push(annotationToAdd);
      this.setState({
        newAnnotation: [],
        annotations: annotations
      });
    }
  };

  public handleMouseMove = (event: any) => {
    const { newAnnotation } = this.state;
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x as number;
      const sy = newAnnotation[0].y as number;
      const { x, y } = event.target.getStage().getPointerPosition();
      this.setState({newAnnotation: [
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: DrawAnnotations.getIndex()
        }
      ]});
    }
  };

  public toggle = () => {
    this.setState({show: !this.state.show});
  }

  public render() {
    this.loadSelections();
    const { annotations, newAnnotation } = this.state;
    const annotationsToDraw = [...annotations, ...newAnnotation];

    const width = (this.props.width * this.props.scale);
    const height = (this.props.height * this.props.scale);

    const image = !this.state.show 
    ? <Img 
        src={this.props.url} 
        width={width} 
        height={height} 
        lastUpdate={this.props.lastUpdate}
        space="fill"
      />
    : null;

    return (
      <>
      <p>Difine locations to monitor</p>
        <Button 
          type="primary"
          onClick={() => this.save()}
        >Save</Button>
        <Button 
          type="ghost"
          onClick={() => this.toggle()}
        >{this.state.show ? 'Show' : 'Hide' }</Button>
      <p></p>
      <Stage
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        width={width}
        height={height}
      >
        <Layer>
          {image}
          {annotationsToDraw.map(value => {
            return (
              <DrawedRect
                key={value.key}
                index={value.key}
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.height}
                stateValid={!(Math.abs(value.width) < 25 || Math.abs(value.height) < 25)}
                removed={(key: string) => this.removed(key)}
              />
            );
          })}
        </Layer>
      </Stage>
    </>
    );
  }

  private async loadSelections() {
    if (this.state.lastSourceId !== this.props.sourceId) {

      const data:Annotation[] = [];
      const annotations: Annotation[] = [];
      (await this.Client.allSelected(this.props.sourceId)).forEach((el) => {
        const model = {
          key: DrawAnnotations.getIndex(),
          x: el.x1! * this.props.scale,
          y: el.y1! * this.props.scale,
          width: (el!.x2! - el.x1!) * this.props.scale,
          height: (el!.y2! - el.y1!) * this.props.scale
        };
        data.push(model);
        annotations.push(model);
      });
      this.setState({
        data: data,
        annotations: annotations,
        lastSourceId: this.props.sourceId
      });
    }
  }

  private removed(key: string): void {
    const { annotations } = this.state;
    this.setState({annotations: annotations
      .filter((x) => x.key !== key )})
  }

  private async save(): Promise<void> {
    const { annotations, newAnnotation } = this.state;
    const annotationsToDraw = [...annotations, ...newAnnotation];

    const rects: Rect[] = [];
    annotationsToDraw.filter((value) => 
      !(Math.abs(value.width) < 25 || Math.abs(value.height) < 25))
      .forEach((el) => {
        const model = new Rect();
        model.x1 = Math.round(el.x / this.props.scale);
        model.x2 = Math.round((el.x + el.width) / this.props.scale);
        model.y1 = Math.round(el.y / this.props.scale);
        model.y2 = Math.round((el.y + el.height) / this.props.scale);
        rects.push(model);
      });
    await this.Client.selected(this.props.sourceId, rects);
  }
};