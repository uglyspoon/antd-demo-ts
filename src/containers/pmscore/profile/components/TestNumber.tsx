import React from 'react';
import { Card, Icon, Select } from 'antd';
import styles from '../style.module.less'
import { TestNumberDataType } from '../data.d';

const Option = Select.Option;
const TestNumber = ({
  handleChange,
  data
}: {
  handleChange: (selecdValue:string) => void;
  data: TestNumberDataType[];
}) => (
  <Card
    title={<><Icon type="line-chart" style={{ marginRight: 10, fontSize: 18 }} />累计测试人数</>}
    extra={
      <Select defaultValue="jack" style={{ width: 100 }} onChange={handleChange}>
        <Option value="jack">近一个月</Option>
        <Option value="lucy">半年</Option>
        <Option value="disabled" >
          一年
        </Option>
        <Option value="Yiminghe">全部</Option>
      </Select>
    }
    className={styles.cardContainer}
  >
    <div className={styles.titleBoxC}>
      <div className={styles.titleBox}>
        <h3>总人次</h3>
        <span>687</span>
      </div>
      <div className={styles.titleBox}>
        <h3>立定跳远</h3>
        <span>687</span>
      </div>
      <div className={styles.titleBox}>
        <h3>坐位体前屈</h3>
        <span>687</span>
      </div>
      <div className={styles.titleBox}>
        <h3>引体向上</h3>
        <span>687</span>
      </div>
    </div>
    <div className={styles.titleBoxC}>
      <div className={styles.titleBox}>
        <h3>仰卧起坐</h3>
        <span>687</span>
      </div>
      <div className={styles.titleBox}>
        <h3>50米跑</h3>
        <span>687</span>
      </div>
      <div className={styles.titleBox}>
        <h3>1000米跑</h3>
        <span>687</span>
      </div>
      <div className={styles.titleBox}>
        <h3>800米跑</h3>
        <span>687</span>
      </div>
    </div>
  </Card>
)

export default TestNumber;
