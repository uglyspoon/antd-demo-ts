import React from 'react';
import { Form, Row, Col, Select, Button, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import request from 'utils/request';
import { isSuccess } from 'utils';
import styles from './SimpleForm.module.less';


interface ItemProp {
  id: number;
  name: string;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const { Option } = Select;

interface IFormComponentProps extends FormComponentProps {
  submitting?: boolean;
  readonly handleSearch: (params: any) => void;
  readonly resetForm: () => void;
  style?: any;
}

const marginRight = { marginRight: 5 };
class FormComponent extends React.PureComponent<IFormComponentProps, {
  itemList: ItemProp[],
}> {
  state = {
    itemList: [],
  }

  componentDidMount() {
    this.getItemData();
  }

  getItemData = async () => {
    const res = await request({
      url: '/igt/getItem',
      method: 'get'
    })
    if (isSuccess(res)) {
      this.setState({
        itemList: res.data
      })
    }
  }

  handleSearch = (e: any) => {
    e.preventDefault()
    const { form, handleSearch } = this.props;
    const values = form.getFieldsValue();
    handleSearch && handleSearch({ ...values })
  }
  resetForm = (e: any) => {
    e.preventDefault();
    const { resetForm, form } = this.props;
    form.resetFields();
    resetForm && resetForm();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSearch, style = {} } = this.props;
    const { itemList } = this.state;
    return (
      <Form {...formItemLayout} className={styles.formContainer} onSubmit={this.handleSearch} style={style}>
        <Row gutter={40} type="flex" align="middle">
          <Col lg={5} xs={12}>
            <Form.Item label="项目" >
              {getFieldDecorator(`itemId`, {
                rules: [],
                initialValue: 9
              })(
                <Select placeholder="--全部--" allowClear>
                  {itemList.map((item: ItemProp) => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={5} xs={12}>
            <Form.Item label="时间" >
              {getFieldDecorator(`resultDate`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  <Option value={1} key="近30天">近30天</Option>
                  <Option value={2} key="近60天">近60天</Option>
                  <Option value={3} key="近90天">近90天</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={5} xs={12}>
            <Form.Item label="性别" >
              {getFieldDecorator(`sex`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  <Option value={1} key="男">男</Option>
                  <Option value={0} key="女">女</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={4} xs={0}></Col>
          <Col lg={5} xs={24} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button type="primary" style={marginRight} htmlType='submit'>搜索</Button>
            <Button onClick={this.resetForm}>重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create<IFormComponentProps>()(FormComponent);
