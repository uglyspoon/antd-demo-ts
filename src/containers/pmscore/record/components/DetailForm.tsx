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
  collegeList: string[];
  gradeList: string[];
  clazzList: string[];
  itemList: ItemProp[];
}> {
  state = {
    collegeList: [],
    gradeList: [],
    clazzList: [],
    itemList: [],
  }

  componentDidMount() {
    this.getCollegeData();
    this.getGradeData();
    this.getClazzData();
    this.getItemData();
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSearch, style = {} } = this.props;
    const { itemList, collegeList, gradeList, clazzList } = this.state;

    return (
      <Form {...formItemLayout} className={styles.formContainer} onSubmit={this.handleSearch} style={style}>
        <Row gutter={20} type="flex" align="middle">
          <Col lg={5} xs={12}>
            <Form.Item label="项目" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
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
            <Form.Item label="院系" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
              {getFieldDecorator(`college`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {collegeList.map((item: string) => <Option value={item} key={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={5} xs={12}>
            <Form.Item label="年级" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              {getFieldDecorator(`grade`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {gradeList.map((item: string) => <Option value={item} key={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={5} xs={12}>
            <Form.Item label="班级" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
              {getFieldDecorator(`clazz`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {clazzList.map((item: string) => <Option value={item} key={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={4} xs={24} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button type="primary" style={marginRight} htmlType='submit'>搜索</Button>
            <Button onClick={this.resetForm}>重置</Button>
          </Col>
        </Row >
      </Form >
    )
  }
}

export default Form.create<IFormComponentProps>()(FormComponent);
