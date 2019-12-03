import React from 'react';
import { Card, Icon, Select, Row, Col, Form } from 'antd';
import styles from '../style.module.less'
import { TestNumberDataType } from '../data.d';

const Option = Select.Option;
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const TestNumber = ({
  handleChange,
  data
}: {
  handleChange: (selecdValue: string) => void;
  data: TestNumberDataType[];
}) => (
    <Card
      title={<><Icon type="line-chart" style={{ marginRight: 10, fontSize: 18 }} />累计测试人数</>}
      extra={
        <Select defaultValue="jack" style={{ width: 100 }} onChange={handleChange}>
          <Option value="jack">近一个月</Option>
          <Option value="lucy">半年</Option>
          <Option value="disabled" > 一年</Option>
          <Option value="Yiminghe">全部</Option>
        </Select>
      }
      className={styles.cardContainer}
      bordered={false}
    >
      <Row className={styles.container} gutter={24} style={{ height: 'auto' }}>
        <Col span={6} >
          <div className={styles.flexCenter}>
            <h3>立定跳远</h3>
            <p>优秀:<span>5%</span></p>
            <p>合格:<span>75%</span></p>
            <p>不合格:<span>20%</span></p>
          </div>
        </Col>
        <Col span={6} >
          <div className={styles.flexCenter}>
            <h3>仰卧起坐</h3>
            <p>优秀:<span>5%</span></p>
            <p>合格:<span>75%</span></p>
            <p>不合格:<span>20%</span></p>
          </div>
        </Col>
        <Col span={6} >
          <div className={styles.flexCenter}>
            <h3>俯卧撑</h3>
            <p>优秀:<span>5%</span></p>
            <p>合格:<span>75%</span></p>
            <p>不合格:<span>20%</span></p>
          </div>
        </Col>
        <Col span={6} >
          <div className={styles.flexCenter}>
            <h3>飞速前进</h3>
            <p>优秀:<span>5%</span></p>
            <p>合格:<span>75%</span></p>
            <p>不合格:<span>20%</span></p>
          </div>
        </Col>
      </Row>
    </Card>
  )

export default TestNumber;
