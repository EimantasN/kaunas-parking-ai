import * as React from 'react';
import { Row, Col } from 'antd';

export interface IStatsProps {
    count: number,
    free: number,
    lastUpdate: Date
}

export interface IStatsState {
}

export default class Stats extends React.Component<IStatsProps, IStatsState> {
    render() {
        return (
            <div>
                <Row justify="center">
                    <Col span={12} >
                        <div className="countItem">
                            <p className="countTotal">Total</p>
                            <p className="countFree">{this.props.count}</p>
                        </div>
                    </Col>
                    <Col span={12}>                         
                        <div className="countItem">
                            <p className="countTotal">Free</p>
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