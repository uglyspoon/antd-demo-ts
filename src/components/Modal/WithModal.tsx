import React from 'react';
import request from 'utils/request';
import { isSuccess } from 'utils';
import { Modal } from 'antd';

type urlParamsType = {
  url: string;
  [k: string]: any;
}

const withModal = (fetchParams: urlParamsType, trigger: any) => (WrappedComponent: any) => {
  return class extends React.Component<{ [k: string]: any }, { data: any, visible: boolean, values: any }> {
    constructor(props: any) {
      super(props);
      this.state = {
        visible: false,
        data: {},
        values: undefined,
      };
    }

    componentDidMount() {
      this.fetchData()
    }

    fetchData = async () => {
      if (!fetchParams) {
        return
      }
      const res = await request(fetchParams)
      if (isSuccess(res)) {
        this.setState({
          data: res.data
        })
      }
    }

    toggleVisible = () => {
      this.setState({
        visible: !this.state.visible
      })
    }
    onOk = () => {
      this.toggleVisible()
      this.props.onOk && this.props.onOk(this.state.values)
    }
    onChange = (values: any) => {
      this.setState({ values })
    }
    render() {

      return (
        <>
          {React.cloneElement(trigger, { onClick: this.toggleVisible })}
          <Modal
            visible={this.state.visible}
            title={this.props.title}
            width={this.props.width}
            onCancel={this.toggleVisible}
            onOk={this.onOk}
            destroyOnClose={true}
          >
            <WrappedComponent {...this.state} {...this.props} onChange={this.onChange} />
          </Modal>
        </>
      )
    }
  };
}

export default withModal
