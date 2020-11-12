import * as React from 'react';
import { Row, Col } from 'antd';

export interface IAppProps {
    count: number,
    free: number,
    lastUpdate: Date
}

export interface IAppState {
}

export default class Stats extends React.Component<IAppProps, IAppState> {
    render() {
        return (
            <div>
                <Row justify="center">
                    <Col span={12} >
                        <div className="countItem">
                            <p className="countTotal">Mašinų skaičius</p>
                            <p className="countFree">{this.props.count}</p>
                        </div>
                    </Col>
                    <Col span={12}>                         
                        <div className="countItem">
                            <p className="countTotal">Laisvos vietos</p>
                            <p className="countFree">{this.props.free}</p>
                        </div>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <p>{this.props.lastUpdate?.toLocaleTimeString()}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}