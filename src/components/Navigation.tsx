import * as React from 'react';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export interface INavigatioProps {
}

export interface INavigationState {
    current: string
}

export default class Navigation extends React.Component<INavigatioProps, INavigationState> {
  constructor(props: INavigatioProps) {
    super(props);

    this.state = {
        current: 'main'
    }
  }

  public handleClick = (e: any) => {
    this.setState({ current: e.key });
  };

  public render() {
    const { current } = this.state;
    return (
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item 
            key="mrcnn">
            <Link to="/">
                Mask RCNN
            </Link>
          </Menu.Item>
          <Menu.Item 
            disabled={true} 
            key="yolo">
              <Link to="/yolo">
                  YOLO
              </Link>
          </Menu.Item>
        </Menu>
      );
    }
}
