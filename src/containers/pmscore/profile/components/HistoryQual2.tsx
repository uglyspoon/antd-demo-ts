import React from 'react';
import { Card, Icon, Select, Row, Col, Form } from 'antd';
import styles from '../style.module.less'
import { TestNumberDataType } from '../data.d';
import Donut from 'components/Charts/Donut';

const Option = Select.Option;
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const TestNumber = ({
  handleChange,
  data
}: {
  handleChange: (selecdValue: number) => void;
  data: any;
}) => (
    <Card
      title={<><img src={require('assets/合格率@2x.png')} alt="" style={{ marginRight: 10, width: 25 }} />历史合格率</>}
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
      <Row className={styles.qualContainer} gutter={24} style={{ padding: 25, background: '#F9FAFB' }}>
        <Col span={4} >
          <ul className={styles.ulContainer}>
            <li><span>优秀</span></li>
            <li><span>合格</span></li>
            <li><span>不及格</span></li>
          </ul>
        </Col>
        {data.map((item: any) => <>
          <Col span={4} >
            <p>{item.itemName}</p>
            <Donut height={150} data={item.chartVoList.map((i: any) => ({ item: i.level, count: +i.item }))} showLabel={false} />
          </Col>
        </>)}

      </Row>
    </Card>
  )

export default TestNumber;
