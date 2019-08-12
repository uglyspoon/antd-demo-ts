import React from 'react';
import { Form, Row, Col, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
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
  readonly handleSearch?: () => void;
  style?:any
}

class FormComponent extends React.PureComponent<IFormComponentProps> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSearch, style } = this.props;
    return <Form {...formItemLayout} className="search-form" onSubmit={handleSearch} style={style||{}}>
    <Row gutter={12}>
      <Col span={6}>
          <Form.Item label="院系" labelCol={{ span: 4 }} wrapperCol={{span: 20}}>
          {getFieldDecorator(`departmentID`, {
            rules: [],
            initialValue: 1,
          })(
            <Select>
              <Option value={1}>社会体育系</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="年级" labelCol={{ span: 4 }} wrapperCol={{span: 20}}>
          {getFieldDecorator(`certName`, {
            rules: [],
            initialValue: 1,
          })(
            <Select>
              <Option value={1}>2017级</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="班级" labelCol={{ span: 4 }} >
          {/* labelCol={{ span: 4 }} */}
          {getFieldDecorator(`search_time`, {
            rules: [],
            initialValue: 1,
          })(
            <Select>
              <Option value={1}>全部</Option>
            </Select>
          )}
        </Form.Item>
        </Col>
        <Col span={6}>
        <Form.Item label="性别" labelCol={{ span: 4 }} wrapperCol={{span: 18}}>
          {getFieldDecorator(`search_time123`, {
            rules: [],
            initialValue: 1,
          })(
            <Select>
              <Option value={1}>全部</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
    </Row>
  </Form>
  }
}


export default Form.create<IFormComponentProps>()(FormComponent);
