import React from 'react';
import { Transfer, Tree } from 'antd';

const { TreeNode } = Tree;

// Customize Table Transfer
const isChecked = (selectedKeys: string[], eventKey:string) => {
  return selectedKeys.indexOf(eventKey) !== -1;
};

const generateTree = (treeNodes = [], checkedKeys:string[]=[] ) => {

  return treeNodes.map(({ children, ...props }: {children: any, [k:string]: any}) => (
    <TreeNode {...props}
      disabled={checkedKeys.includes(props.key)}
      key={props.key}
      checkable={children ? false : true}
      selectable={children ? false : true}
    >
      {generateTree(children, checkedKeys)}
    </TreeNode>
  ));
};

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }: { targetKeys: string[], [k:string]: any}) => {
  const transferDataSource:any[] = [];
  function flatten(list:any[] = []) {
    list.forEach(item => {
      transferDataSource.push(item);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={item => item.title}
      showSelectAll={false}
    >
      {(
        { direction, onItemSelect, selectedKeys }:
        { onItemSelect: (key: string, selected: boolean) => any, direction: 'left' | 'right', selectedKeys: any }
      ) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={(
                _,
                {
                  node: {
                    props: { eventKey },
                  },
                },
              ) => {
                onItemSelect(eventKey || '', !isChecked(checkedKeys, eventKey|| ''));
              }}
              onSelect={(
                _,
                {
                  node: {
                    props: { eventKey },
                  },
                },
              ) => {
                onItemSelect(eventKey||'', !isChecked(checkedKeys, eventKey||''));
              }}
            >
              {generateTree(dataSource, targetKeys)}
            </Tree>
          );
        }
      }}
    </Transfer>
  );
};

interface Props {
  data?: any,
  setTargetKeys: (keys: string[]) => void,
  targetKeys: string[],
}

class TreeSelect extends React.PureComponent<Props, object> {
  state = {
    // targetKeys: this.props.targetKeys || [],
    treeData: [],
    totalNum:0,
  };

  onChange = (targetKeys:string[]) => {
    const { setTargetKeys } = this.props;
    setTargetKeys(targetKeys)
    if (!targetKeys.length) {
      this.setState({
        totalNum: 0
      });
      return
    }
    let totalNum:number = targetKeys.map(item=>+item.split('-')[1]).reduce((a,b):number=>+a+Number(b))
    this.setState({
      totalNum
    });
  };
  componentDidMount() {
    this.computeData(this.props.data)
  }

  computeData = (data: any[]) => {
    let sortedData:any = []
    data.forEach((item: any) => {
      let newItem:any = {}
      let key = Object.keys(item)[0]
      newItem['key'] = key
      newItem['title'] = key
      newItem['children'] = []
      item[key].forEach((el: any) => {
        let elKey = Object.keys(el)[0]
        el[elKey].forEach((r: any) => {
          let newR: any = {}
          let rKey = Object.keys(r)[0]
          let num = r[rKey]
          newR['title'] = elKey+  rKey
          newR['key'] = `${key}|${elKey}|${rKey}|-${num}`;
          newItem['children'].push(newR)
        })
      })
      sortedData.push(newItem)
    })
    this.setState({treeData: sortedData})
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.data !== prevProps.data) {
      this.computeData(this.props.data)
    }
  }

  render() {
    const boldStyle = { fontWeight: 600 };
    return (
      <div>
        <TreeTransfer
          dataSource={this.state.treeData}
          targetKeys={this.props.targetKeys}
          onChange={this.onChange}
          titles={[<span style={boldStyle}>班级</span> , <span style={boldStyle}>已选{this.state.totalNum}人</span>]}
        />
      </div>
    );
  }
}

export default TreeSelect;
