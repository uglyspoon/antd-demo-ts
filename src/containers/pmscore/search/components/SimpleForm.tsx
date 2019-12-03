import React from 'react';
import { Form, Row, Col, Select, Button, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import request from 'utils/request';
import { isSuccess } from 'utils';
import styles from './SimpleForm.module.less';
import Search from 'antd/lib/input/Search';


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
    e && e.preventDefault()
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
          <Col lg={8} xs={24}>
            <Form.Item label="" colon={false} wrapperCol={{ xs: 24 }}>
              {getFieldDecorator(`name`, {
                rules: [],
              })(
                <Search
                  placeholder="请输入学生姓名"
                  onSearch={handleSearch}
                  style={{ width: '100%' }}
                />
              )}
            </Form.Item>
          </Col>
          <Col lg={5} xs={12}>
            <Form.Item label="日期" >
              {getFieldDecorator(`resultDate`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  <Option value={2019} key="2019">2019</Option>
                  <Option value={2018} key="2018">2018</Option>
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
