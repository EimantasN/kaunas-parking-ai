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
          <Menu.Item key="main" icon={<SettingOutlined />}>
            Pagrindinis
          </Menu.Item>
          <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Modeliai">
            <Menu.Item key="mrcnn">
                <Link to="/mrcnn">
                    Mask RCNN
                </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Literature" icon={<SettingOutlined />} title="Šaltiniai">
            <Menu.Item key="leterature:1">
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    MRCNN
                </a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      );
    }
}
