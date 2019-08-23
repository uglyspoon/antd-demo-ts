import React,{ useState, useEffect, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import request from 'utils/request';
import { Card, Row, Divider } from 'antd';
import { isSuccess } from 'utils';
import DetailForm from './components/DetailForm';
import moment from 'moment';

interface Props extends RouteComponentProps{
}
interface ItemType {
  id: number;
  name: string;
}
interface ClazzType {
  clazz: string;
  college: string;
  grade: string;
  stuNum: number;
}
interface Record {
  clazzList: Array<ClazzType>;
  itemList: Array<ItemType>;
  sn: string;
  testDate: string;
}
const styleBottom = { marginBottom: 20 };
const Detail: React.FC<Props> = ({ history }) => {
  const { location: { pathname } } = history;
  const [record, setRecord] = useState<Record>()
  const fetchData = useCallback(async () => {
    const res = await request({
      url: `/plan/getBySn?sn=${pathname.split('/').pop()}`,
      method: 'get'
    })
    if (isSuccess(res)) {
      setRecord(res.data)
    }
  }, [pathname])

  useEffect(() => {
    fetchData()
    console.log(history)
  }, [])
  const jumpToEdit = () => {
    record && history.push('/plan/add?sn='+record.sn)
  }
  return (
    <Card>
      <h1 style={styleBottom}>{record && moment(record.testDate, 'YYYY-MM-DD').format('YYYY年MM月DD日')}体测计划</h1>
      <Row type="flex" justify="space-between" style={styleBottom}>
        <div><b>体测项目: </b>{record && record.itemList.map((el: ItemType) => el.name + ';  ')}</div>
        <a href="#" onClick={jumpToEdit}>编辑</a>
      </Row>
      <Row type="flex" style={styleBottom}>
        <div><b>体测项目: </b>{record && record.clazzList.map((el: ClazzType) => el.college + el.grade + el.clazz + ';  ')}</div>
      </Row>
      <Row type="flex">
        <b>&emsp;&emsp;&emsp;&emsp;&nbsp;</b>
        (共{record && record.clazzList.map((el: ClazzType) => el.stuNum).reduce((a: number, b: number) => a + b)}人)
      </Row>
      <Divider />
      <DetailForm />
    </Card>
  )
}

export default withRouter(Detail);
