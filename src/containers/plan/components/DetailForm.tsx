import React from 'react';
import { Form, Row, Col, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import request from 'utils/request';
import { withRouter, RouteComponentProps } from 'react-router-dom';


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


interface FormTypes extends FormComponentProps, RouteComponentProps {
  handleSearch?: () => void;
  style?: object;
}

const FormComponent:React.FC<FormTypes> = ({form, style, handleSearch, history}) => {

  const { getFieldDecorator } = form;

  const jumpToAdd = () => {
    history.push('/plan/add')
  }

  return (
    <Form {...formItemLayout} className="search-form" onSubmit={handleSearch} style={style||{}}>
      <Row gutter={12} type="flex" justify="start">
        <Col span={6}>
            <Form.Item label="体测项目" labelCol={{ span: 6 }} wrapperCol={{span: 18}}>
              {getFieldDecorator(`departmentID`, {
                rules: [],
                initialValue: 1,
              })(
                <Select>
                  <Option value={1}>一个月内</Option>
                </Select>
              )}
            </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="体测班级" labelCol={{ span: 6 }} wrapperCol={{span: 18}}>
             {getFieldDecorator(`departmentID123`, {
               rules: [],
               initialValue: 1,
             })(
               <Select>
                 <Option value={1}>一个月内</Option>
               </Select>
             )}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row type="flex" justify="end">
            <Button type="primary" htmlType="submit">搜索</Button>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(withRouter(React.memo(FormComponent)));
