import React from 'react';
import { Form, Row, Col, Select, Button, Input, Radio, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import request from 'utils/request';
import { isSuccess } from 'utils';
import styles from './SimpleForm.module.less';
import moment from 'moment';

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
  style?: React.CSSProperties;
}
interface ItemProp {
  id: number;
  name: string;
}

const marginRight = { marginRight: 5 };
class FormComponent extends React.PureComponent<IFormComponentProps, {

}> {
  state = {

  }

  componentDidMount() {

  }


  handleSearch = (e: any) => {
    e.preventDefault()
    const { form, handleSearch } = this.props;
    let values = form.getFieldsValue();

    handleSearch && handleSearch({ ...values })
  }
  resetForm = (e: any) => {
    e.preventDefault();
    const { resetForm, form } = this.props;
    form.resetFields();
    resetForm && resetForm();
  }
  onChangeType = (e: any) => {
    this.setState({
      type: e.target.value
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSearch, style = {} } = this.props;

    return (
      <Form {...formItemLayout} className={styles.formContainer} onSubmit={this.handleSearch} style={style}>
        <Row gutter={20} type="flex" align="middle">
          <Col lg={5} xs={12}>
            <Form.Item label="日期" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              {getFieldDecorator(`resultDate`, {
                rules: [],
                initialValue: 11
              })(
                <Select>
                  <Option value={11}>近一个月</Option>
                  <Option value={12}>近半年</Option>
                  <Option value={13}>近一年</Option>
                </Select>
              )}

            </Form.Item>
          </Col>
          <Col lg={5} xs={12}>
          </Col>
          <Col lg={5} xs={12}>

          </Col>
          <Col lg={4} xs={12}>

          </Col>
          <Col lg={5} xs={24} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button type="primary" style={marginRight} htmlType='submit'>搜索</Button>
            <Button onClick={this.resetForm}>重置</Button>
          </Col>
        </Row >
      </Form >
    )
  }
}

export default Form.create<IFormComponentProps>()(FormComponent);
