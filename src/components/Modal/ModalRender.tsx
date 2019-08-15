import React from 'react';
import { Modal } from 'antd';
import request from 'utils/request';
import { isSuccess } from 'utils';

interface ModalProps {
  visible?: boolean;
  title?: string;
  width?: number;
  trigger?: any;
  render?: any;
  fetchParams?: any;
  onOk?: () => void;
}
class ModalRender extends React.Component<ModalProps, {}> {

  state = {
    visible: this.props.visible || false,
    data: null
  }

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  componentDidMount = async () => {
    const { fetchParams } = this.props;
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

  onOk = () => {
    this.toggleVisible()
    this.props.onOk && this.props.onOk()
  }

  render() {
    const { visible } = this.state;
    return (
      <>
        {React.cloneElement(this.props.trigger, {onClick: this.toggleVisible})}
        <Modal
          visible={visible}
          title={this.props.title}
          width={this.props.width}
          onCancel={this.toggleVisible}
          onOk={this.onOk}
          destroyOnClose={false}
        >
          {this.props.render(this.state)}
        </Modal>
      </>
    )
  }
}

export default ModalRender;
