import React from 'react';
import { Form, Row, Col, Select, Button, DatePicker } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import request from 'utils/request';
import { isSuccess } from 'utils';
import styles from './SimpleForm.module.less';
import ItemList from 'containers/studentinfo/components/ItemList2';

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

interface ItemProp {
  id: number;
  name: string;
}

interface IFormComponentProps extends FormComponentProps {
  submitting?: boolean;
  readonly handleSearch?: (params: any) => void;
  readonly resetForm?: () => void;
  style?: any;
}

const marginRight = { marginRight: 5 };
class FormComponent extends React.PureComponent<IFormComponentProps, {
  collegeList: string[],
  gradeList: string[],
  clazzList: string[],
  itemList: ItemProp[],
  type: string,
}> {
  state = {
    collegeList: [],
    gradeList: [],
    clazzList: [],
    itemList: [],
    type: 'a',
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
    const values = form.getFieldsValue();
    handleSearch && handleSearch({ ...values })
  }
  resetForm = (e: any) => {
    e.preventDefault();
    const { resetForm, form } = this.props;
    form.resetFields();
    resetForm && resetForm();
  }
  onChangeType = (type: string) => {
    this.setState({
      type
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSearch, style = {} } = this.props;
    const { collegeList, gradeList, clazzList, itemList, type } = this.state;
    return (
      <Form {...formItemLayout} className={styles.formContainer} onSubmit={this.handleSearch} style={style}>
        <Row gutter={4} type="flex" align="middle">
          <Col span={type === 'a' ? 6 : 5}>
            <Form.Item label="视频分类" >
              {getFieldDecorator(`type`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear onChange={this.onChangeType}>
                  <Option value={'a'}>按学生查看</Option>
                  <Option value={'b'}>按摄像头查看</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          {
            type === 'a' ? <>
              <Col span={6}>
                <Form.Item label="院系" >
                  {getFieldDecorator(`college`, {
                    rules: [],
                  })(
                    <Select placeholder="--全部--" allowClear>
                      {collegeList.map((item: string) => <Option value={item}>{item}</Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="年级"  >
                  {getFieldDecorator(`grade`, {
                    rules: [],
                  })(
                    <Select placeholder="--全部--" allowClear>
                      {gradeList.map((item: string) => <Option value={item}>{item}</Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col></> :
              <>
                <Col span={5}>
                  <Form.Item label="摄像头" >
                    {getFieldDecorator(`college`, {
                      rules: [],
                    })(
                      <Select placeholder="--全部--" allowClear>
                        {collegeList.map((item: string) => <Option value={item}>{item}</Option>)}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="日期" >
                    {getFieldDecorator(`date`, {
                      rules: [],
                    })(
                      <DatePicker />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="项目" >
                    {getFieldDecorator(`college`, {
                      rules: [],
                    })(
                      <Select placeholder="--全部--" allowClear>
                        {itemList.map((item: ItemProp) => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="primary" style={marginRight} htmlType='submit'>搜索</Button>
                  <Button onClick={this.resetForm}>重置</Button>
                </Col>
              </>

          }
        </Row>
        {type === 'a' ? <Row gutter={4} type="flex" align="middle">
          <Col span={6}>
            <Form.Item label="班级" >
              {getFieldDecorator(`clazz`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {clazzList.map((item: string) => <Option value={item}>{item}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="日期" >
              {getFieldDecorator(`date`, {
                rules: [],
              })(
                <DatePicker />
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="项目"  >
              {getFieldDecorator(`project`, {
                rules: [],
              })(
                <Select placeholder="--全部--" allowClear>
                  {itemList.map((item: ItemProp) => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" style={marginRight} htmlType='submit'>搜索</Button>
            <Button onClick={this.resetForm}>重置</Button>
          </Col>
        </Row> :
          null}
      </Form>
    )
  }
}

export default Form.create<IFormComponentProps>()(FormComponent);
