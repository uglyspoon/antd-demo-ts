import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, DatePicker, Card, Input, Modal, Tag, message } from 'antd';
import TreeSelect from './components/TreeSelect';
import ModalRender from 'components/Modal/ModalRender';
import CheckBoxGroup from './components/CheckboxGroup';
import withModal from 'components/Modal/WithModal';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import moment from 'moment';
import request from 'utils/request';
import { isSuccess } from 'utils';
import qs from 'query-string';

interface projectType {
  value: number;
  label: string;
}

const projectParams = {
  url: '/igt/getItem',
  method: 'get'
}
const addButton = <a >+ 添加</a>
const ModalCheckBox = withModal(projectParams, addButton)(CheckBoxGroup)

const AddPlan: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [projects, setProjects] = useState<projectType[]>([]);
  const [isOk, setIsOk] = useState<boolean>(false);
  const [people, setPeople] = useState<number>(0);
  const [date, setDate] = useState(moment())
  // const {getFieldDecorator} = form
  const sn = qs.parse(location.search)['sn']

  const onChangeDate = (date: any) => {
    setDate(date)
  }
  const onOk = () => {
    setIsOk(true)
  }
  const setTargetKeys = (keys: string[]): void => {
    setKeys(keys)
  }
  const onClose = (el: string) => {
    setKeys(keys.filter(item => item !== el))
  }
  const onCloseProject = (peoject: projectType) => {
    setProjects(projects.filter(item => item !== peoject))
  }

  useEffect(() => {
    keys.length ? setPeople(keys.map(item => +item.split('-')[1]).reduce((a, b) => a + b)) : setPeople(0)
  }, [keys])


  useEffect(() => {
    if (!sn) {
      return
    }
    request({
      url: `/plan/getBySn?sn=${sn}`,
      method: 'get',
    }).then(res => {
      const { data } = res;
      console.log('data', data, data.clazzList.map((item: any) => `${item.college}|${item.grade}|${item.clazz}-${item.stuNum}`))
      setKeys(data.clazzList.map((item: any) => `${item.college}|${item.grade}|${item.clazz}|-${item.stuNum}`))
      setIsOk(true)
      setProjects(data.itemList.map((item: any) => ({ label: item.name, value: item.id })))
      setDate(moment(data.testDate, 'YYYY-MM-DD'))
    }).catch(error => {
      console.log(`/plan/getBySn?sn=${sn}出错`)
    })
  }, [sn])

  const renderTree = ({ data }: { data: any }) => <TreeSelect data={data} setTargetKeys={setTargetKeys} targetKeys={keys} />

  const onCheckOk = (val: any) => {
    val && setProjects(val)
  }

  const onSubmit = (e: any) => {
    e && e.preventDefault()
    if (!projects.length) {
      message.warning('请选择项目!')
      return
    }
    if (!keys.length) {
      message.warning('请选择班级!')
      return
    }

    const params: any = {
      testDate: moment(date).format('YYYY-MM-DD'),
      itemIds: projects.map(item => item.value),
      clazzList: keys.map(item => {
        const vals: string[] = item.split('-')[0].slice(0, -1).split('|');
        return {
          "college": vals[0],
          "grade": vals[1],
          "clazz": vals[2]
        }
      })
    }

    if (sn) {
      params.sn = sn
    }
    request({
      url: sn ? '/plan/update' : '/plan/save',
      data: params
    }).then(res => {
      isSuccess(res) && message.success('新增体测计划成功！')
      history.push(sn ? `/plan/detail/${sn}` : '/plan')
    }).catch(err => {
      message.error('出错了～')
    })
  }
  return (
    <Card>
      <h3>新建计划</h3>
      <Form onSubmit={onSubmit}>
        <Row gutter={12} type="flex" justify="space-between">
          <Col {...{ xs: 24, sm: 12, lg: 24 }}>
            <Form.Item label="体测日期" labelCol={{ span: 2 }} wrapperCol={{ span: 18 }}>
              <DatePicker onChange={onChangeDate} value={date} />
            </Form.Item>
          </Col>

        </Row>
        <Row gutter={12}>
          <Col {...{ xs: 24, sm: 12, lg: 24 }}>
            <Form.Item label="体测班级" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
              {
                keys.length && isOk ? <div>
                  {keys.map(item => (
                    <Tag closable onClose={() => onClose(item)} color="blue" key={item}>
                      {item.split('-')[0].slice(0, -1)}
                    </Tag>))
                  }
                  <div>{`共${people}人`}</div>
                </div> : null
              }
              <ModalRender
                title="选择测试班级"
                trigger={addButton}
                render={renderTree}
                fetchParams={{
                  url: '/conner/clazzList',
                  method: 'get'
                }}
                onOk={onOk}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col {...{ xs: 24, sm: 12, lg: 24 }}>
            <Form.Item label="体测项目" labelCol={{ span: 2 }} wrapperCol={{ span: 18 }}>
              {
                projects.length ?
                  projects.map((item: projectType) => (
                    <Tag closable onClose={() => onCloseProject(item)} color="blue" key={item.value}>
                      {item.label}
                    </Tag>)) :
                  null
              }
              {console.log('projects1', projects)}
              <ModalCheckBox onOk={onCheckOk} checkedList={projects.map(r => r.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Button type="primary" icon="plus" htmlType="submit" >提交 </Button>
        </Row>
      </Form>

    </Card>
  )
}

export default withRouter(React.memo(AddPlan))
