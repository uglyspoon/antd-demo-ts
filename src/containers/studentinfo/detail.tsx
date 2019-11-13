import React, { useEffect, useState } from 'react';
import styles from './detail.module.less';
import TopHeader from './components/TopHeader';
import ItemList from './components/ItemList';
import ItemList2 from './components/ItemList2';
import request from 'utils/request';
import { Tabs, Select, Menu, Dropdown, Icon } from "antd";
import { isSuccess } from 'utils';

import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';
import RecordList from './components/RecordList';

const { Option } = Select;

const TabPane = Tabs.TabPane;


const menu = (func: Function) => {
  return <Menu style={{ color: '#8D8D8D' }}>
    <Menu.Item>
      <a onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        func(1)
      }}>
        近30天
      </a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        func(2)
      }}>
        近60天
     </a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        func(3)
      }} >
        近90天
      </a>
    </Menu.Item>
  </Menu >
}

interface IProps extends RouteComponentProps {

}

const StudentInfo: React.FC<IProps> = ({ history }) => {
  const id: any = history.location.pathname.split('/').pop();
  const [studentInfo, setStudentInfo] = useState({})
  const [daysType, setDaysType] = useState(1);
  const [dayText, setDayText] = useState('近30天')

  const setDays = (daysType: number) => {
    setDaysType(daysType)

    setDayText(daysType === 1 ? '近30天' : (daysType === 2 ? '近60天' : '近90天'))
  }
  const operations = (
    <>
      <Dropdown overlay={menu(setDays)} >
        <span style={{ color: '#8D8D8D' }}> {dayText} <Icon type="down" /></span>
      </Dropdown>
    </>
  );

  const AsyncFetchDetail = async (id: string | undefined) => {
    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/detail",
      data: {
        id
      }
    });
    // const res = await axiosInstance.post("/conner/list", params);
    console.log(res)
    if (isSuccess(res)) {
      setStudentInfo(res.data);
      // setTotal(res.data.total);
    }
  };

  useEffect(() => {
    AsyncFetchDetail(id)
  }, [id])

  return (
    <div className={styles.container}>
      <TopHeader studentInfo={studentInfo} id={id} />
      <Tabs
        defaultActiveKey="1"
        onChange={() => { }}
        tabBarExtraContent={operations}
      >
        <TabPane tab="测试记录" key="1">
          <RecordList id={id} daysType={daysType} />
        </TabPane>
        <TabPane tab="成绩分析" key="2">
          <ItemList2 id={id} days={daysType} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default withRouter(StudentInfo);