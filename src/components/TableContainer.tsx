import * as React from 'react';
import { Collapse } from 'antd';
import { Table, Tag, Space } from 'antd';
import { IMatch } from './Api/api';
import { ColumnsType } from 'antd/lib/table/interface';

export interface IAppProps {
    Matches: IMatch[]
}

export interface IAppState {
}

const { Panel } = Collapse;

export default class TableContainer extends React.Component<IAppProps, IAppState> {
  public render() {
    return (
      <div>
        <Collapse defaultActiveKey={[]}>
            <Panel header="Detail Analysis" key="1">
                <Table 
                    sortDirections={['descend']}
                    dataSource={this.props.Matches} 
                    key={'uid'} 
                    columns={columns} />
            </Panel>
        </Collapse>
      </div>
    );
  }
}
  
const columns: ColumnsType<IMatch> = [
    {
        
      title: 'Prediction %',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => {
          if (a?.value && b?.value) {
              return a.value - b.value;
          } else {
              return 0;
          }
      }
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Car Type',
      dataIndex: 'type',
      key: 'type',
    },
];
  
