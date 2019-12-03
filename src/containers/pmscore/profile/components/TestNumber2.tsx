import React from 'react';
import { Card, Icon, Select } from 'antd';
import styles from '../style.module.less'
import { TestNumberDataType } from '../data.d';
import Bar from 'components/Charts/Bar';

const logo = require('assets/人数@2x.png');

const Option = Select.Option;
const TestNumber = ({
  handleChange,
  data = [],
  height = 200,
}: {
  handleChange: (selecdValue: number) => void;
  data: TestNumberDataType[];
  height?: number;
}) => (
    <Card
      //<Icon type="line-chart" style={{ marginRight: 10, fontSize: 18 }} />
      title={<><img src={logo} alt="" style={{ marginRight: 10, width: 25 }} />累计测试人数</>}
      extra={
        <Select defaultValue={11} style={{ width: 100 }} onChange={handleChange}>
          <Option value={11}>近一个月</Option>
          <Option value={12}>近半年</Option>
          <Option value={13}>近一年</Option>
        </Select>
      }
      className={styles.cardContainer}
      bordered={false}
    >
      <Bar data={data} height={height} size={17} color="#4DCCCB" />
    </Card>
  )

export default TestNumber;
