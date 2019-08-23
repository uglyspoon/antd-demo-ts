import React from 'react';
import { Form, Row, Col, Select, Button, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import request from 'utils/request';
import { isSuccess } from 'utils';
import styles from './SimpleForm.module.less';

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
  readonly handleSearch?: (params:any) => void;
  readonly resetForm?: () => void;
  style?: any;
}

const marginRight = { marginRight: 5 };
class FormComponent extends React.PureComponent<IFormComponentProps, {
  collegeList: string[],
  gradeList: string[],
  clazzList: string[],
}> {
  state = {
    collegeList: [],
    gradeList: [],
    clazzList: [],
  }

  componentDidMount () {
    this.getCollegeData();
    this.getGradeData();
    this.getClazzData();
  }

  getCollegeData = async () => {
    const res = await request({
      url: '/conner/getCollege',
      method: 'get'
    })
    if (isSuccess(res)) {
      this.setState({
        collegeList: res.data
      })
    }
  }
  getGradeData = async () => {
    const res = await request({
      url: '/conner/getGrade',
      method: 'get'
    })
    if (isSuccess(res)) {
      this.setState({
        gradeList: res.data
      })
    }
  }
  getClazzData = async () => {
    const res = await request({
      url: '/conner/getClazz',
      method: 'get'
    })
    if (isSuccess(res)) {
      this.setState({
        clazzList: res.data
      })
    }
  }
  handleSearch = (e:any) => {
    e.preventDefault()
    const { form, handleSearch } = this.props;
    const values = form.getFieldsValue();
    handleSearch && handleSearch({...values})
  }
  resetForm = (e: any) => {
    e.preventDefault();
    const { resetForm, form } = this.props;
    form.resetFields();
    resetForm && resetForm();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSearch, style={} } = this.props;
    const { collegeList, gradeList, clazzList } = this.state;
    return (
      <Form {...formItemLayout} className={styles.formContainer} onSubmit={this.handleSearch} style={style}>
        <Row gutter={12} type="flex" align="middle">
          <Col span={8}>
              <Form.Item label="视频分类" labelCol={{ span: 6 }} wrapperCol={{span: 12}}>
              {getFieldDecorator(`college`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {collegeList.map((item:string)=> <Option value={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="院系" labelCol={{ span: 6 }} wrapperCol={{span: 12}}>
              {getFieldDecorator(`grade`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {gradeList.map((item:string)=> <Option value={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="年级" labelCol={{ span: 6 }} >
              {getFieldDecorator(`clazz`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {clazzList.map((item:string)=> <Option value={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
            {/* <Col span={5}>
              <Form.Item label="性别" labelCol={{ span: 6 }} wrapperCol={{span: 18}}>
                {getFieldDecorator(`sex`, {
                  rules: [],
                })(
                  <Select placeholder="--全部--" allowClear>
                    <Option value={1}>男</Option>
                    <Option value={2}>女</Option>
                  </Select>
                )}
              </Form.Item>
            </Col> */}
            {/* <Col span={4}>
              <Button type="primary" style={marginRight} htmlType='submit'>搜索</Button>
              <Button onClick={this.resetForm}>重置</Button>
            </Col> */}
        </Row>
        <Row gutter={12} type="flex" align="middle">
          <Col span={8}>
              <Form.Item label="班级" labelCol={{ span: 6 }} wrapperCol={{span: 12}}>
              {getFieldDecorator(`college`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {collegeList.map((item:string)=> <Option value={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="日期" labelCol={{ span: 6 }} wrapperCol={{span: 12}}>
              {getFieldDecorator(`grade`, {
                rules: [],
              })(
                <DatePicker />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="项目" labelCol={{ span: 6 }} >
              {getFieldDecorator(`clazz`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {clazzList.map((item:string)=> <Option value={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create<IFormComponentProps>()(FormComponent);
