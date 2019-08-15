import React from 'react';
import { Form, Row, Col, Button, Select } from 'antd';
// import { FormComponentProps } from 'antd/es/form';
import request from 'utils/request';
import { withRouter } from 'react-router-dom';


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


const FormComponent  = ({form, style, handleSearch, history}: {form?: any, style?:any, handleSearch?:()=>void, [k:string]: any}) => {
  const { getFieldDecorator } = form;

  const jumpToAdd = () => {
    history.push('/plan/add')
  }

  return (
    <Form {...formItemLayout} className="search-form" onSubmit={handleSearch} style={style||{}}>
      <Row gutter={12} type="flex" justify="space-between">
        <Col span={8}>
            <Form.Item label="体测日期" labelCol={{ span: 6 }} wrapperCol={{span: 18}}>
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
        <Col span={3}>
          <Button type="primary" icon="plus" onClick={jumpToAdd}>新建计划 </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(withRouter(React.memo(FormComponent)));
