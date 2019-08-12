import React, {Fragment, useState, useEffect} from 'react';
import { Row, Col, Button, Card, Badge, Divider, Modal,Form,Input, message } from 'antd';
import StandardTable, { StandardTableColumnProps } from 'components/StandardTable';
import moment from 'moment';
import { FormComponentProps } from 'antd/es/form';
import request from 'utils/request';

type IStatusMapType = 'default' | 'processing' | 'success' | 'error';
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

const Management = ({form}:FormComponentProps) => {
  const columns: StandardTableColumnProps[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'desc',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a href="">重置密码</a>
          <Divider type="vertical" />
          <a href="">编辑</a>
          <Divider type="vertical" />
          <a href="">删除</a>
        </Fragment>
      ),
    },
  ];
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  }
  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        const res = await request({
          url: '/user/add',
          data: values
        })
        if (res && res.status === 200) {
          message.success('添加成功！')
          toggleVisible()
        } else {
          message.error(res.message)
        }
      }
    });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 18 },
    },
  };
  const { getFieldDecorator } = form;
  return (
    <>
      <Card>
        <Row gutter={24} style={{marginBottom:12}}>
          <Col span={6} push={18} style={{display:'flex', justifyContent:'flex-end'}}>
            <Button type='primary' onClick={toggleVisible}>添加子账号</Button>
          </Col>
        </Row>
        <StandardTable
          columns={columns}
          data={{
            list: [],
            pagination: {}
          }}
          // rowKey={r => r.id}
          // loading={loading}
          // data={data}
          // onChange={this.handleStandardTableChange}
        />
      </Card>
      <Modal
        title="添加子账号"
        visible={visible}
        onOk={handleSubmit}
        onCancel={toggleVisible}
      >
        <Form onSubmit={handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item {...formItemLayout} label={'姓名'}>
            {getFieldDecorator('name', {
              rules: [
                  {
                    required: true,
                    message: '请输入',
                  },
                ],
            })(<Input placeholder='请输入' />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label={'登录邮箱'}>
            {getFieldDecorator('username', {
              rules: [
                  {
                    type: 'email',
                    message: '请输入正确的邮箱！',
                  },
                  {
                    required: true,
                    message: '请输入',
                  },
                ],
            })(<Input placeholder='请输入' />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default Form.create()(Management);
