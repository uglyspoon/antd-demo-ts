import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

// const plainOptions = ['Apple', 'Pear', 'Orange'];
// const defaultCheckedList = ['Apple', 'Orange'];

class App extends React.PureComponent<{onChange?:(k?:any)=>any, checkedList: number[]}> {
  //todo  indeterminate & checkAll shouldn't be static
  state = {
    plainOptions: [],
    originData:[],
    checkedList: this.props.checkedList || [],
    indeterminate: false,
    checkAll: false,
  };

  onChange = (checkedList: any) => {
    const {plainOptions} = this.state
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });

    this.props.onChange && this.props.onChange(this.state.plainOptions.filter((item: any)=> checkedList.includes(item.value)))
  };
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.data !== prevState.originData) {
      return {
        plainOptions: nextProps.data.map((item:any)=>({ label: item.name, value: item.id })),
        originData:nextProps.data
      }
    }
    return null
  }
  onCheckAllChange = (e:any) => {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions.map((r:any)=> r.value) : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
    this.props.onChange && this.props.onChange(this.state.plainOptions)
  };

  render() {
    return (
      <div>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            全选
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          options={this.state.plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App
