import React from 'react';
import styles from './detail.module.less';
import TopHeader from './components/TopHeader';
import ItemList from './components/ItemList';
import { Tabs, Select } from "antd";

const {Option} = Select;

const TabPane = Tabs.TabPane;



const StudentInfo:React.FC = () => {
  const operations = (
    <>
    <a style={{marginRight: 20}}>输出分析</a>
    <Select style={{width: 200}} defaultValue={1}>
      <Option key={1} value={1}>近30天</Option>
      <Option key={2}>2</Option>
    </Select>
    </>
  );

  return (
    <div className={styles.container}>
      <TopHeader />
      <Tabs
        defaultActiveKey="1"
        onChange={() => {}}
        tabBarExtraContent={operations}
      >
        <TabPane tab="成绩分析" key="1">
          <ItemList />
        </TabPane>
        <TabPane tab="指标分析" key="2">
          <ItemList />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default StudentInfo;