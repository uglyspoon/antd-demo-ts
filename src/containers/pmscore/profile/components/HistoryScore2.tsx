import React from 'react';
import { Card, Icon, Select, Row, Col } from 'antd';
import styles from '../style.module.less'
import { TestNumberDataType } from '../data.d';
import Bar from 'components/Charts/Bar';

const Option = Select.Option;
const TestNumber = ({
  handleChange,
  data
}: {
  handleChange: (selecdValue: number) => void;
  data: any;
}) => (
    <Card
      title={<><img src={require('assets/历史成绩@2x.png')} alt="" style={{ marginRight: 10, width: 25 }} />历史成绩TOP3</>}
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
      <div style={{ padding: '20px 0 ', background: '#F9FAFB' }}>
        <Row className={styles.historyContainer} gutter={24}>
          <Col span={4}>
          </Col>

          {data.title && data.title.map((item: any) => <Col span={4}>
            {item}
          </Col>)}
        </Row>
        <Row className={styles.historyContainer} gutter={24} >
          <Col span={4} style={{}}>
            TOP1
        </Col>
          {data.top1 && data.top1.map((item: any) => <Col span={4}>
            <span className={styles.scoreLabel}>
              {item.val}<span>{item.unit}</span>
            </span>
          </Col>)}
        </Row>
        <Row className={styles.historyContainer} gutter={24} >
          <Col span={4}>
            TOP2
        </Col>
          {data.top2 && data.top2.map((item: any) => <Col span={4}>
            <span className={styles.scoreLabel}>
              {item.val}<span>{item.unit}</span>
            </span>
          </Col>)}
        </Row>
        <Row className={styles.historyContainer} gutter={24} >
          <Col span={4}>
            TOP3
        </Col>
          {data.top3 && data.top3.map((item: any) => <Col span={4}>
            <span className={styles.scoreLabel}>
              {item.val}<span>{item.unit}</span>
            </span>
          </Col>)}
        </Row>

      </div>
    </Card >
  )

export default TestNumber;
