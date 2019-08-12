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
  handleChange: (selecdValue: string) => void;
  data: TestNumberDataType[];
}) => (
  <Card
    title={<><Icon type="line-chart" style={{ marginRight: 10, fontSize: 18 }} />历史成绩TOP3</>}
    extra={
      <Select defaultValue="jack" style={{ width: 100 }} onChange={handleChange}>
        <Option value="jack">近6个月</Option>
        <Option value="lucy">半年</Option>
        <Option value="disabled" > 一年</Option>
        <Option value="Yiminghe">全部</Option>
      </Select>
    }
    className={styles.cardContainer}
  >
      <Row className={styles.container} gutter={24} style={{height: 200}}>
        <Col span={6}>
          <Bar
            title={<>{'立定跳远'}</>}
            data={[{ x: '1', y: 2 }, { x: '2', y: 4 }, { x: '3', y: 6 }]}
            transpose={true}
            titlePosition='center'
            titleFontSize={18}
          />
        </Col>
        <Col span={6}>
          <Bar
            title='仰卧起坐'
            data={[{ x: '1', y: 2 }, { x: '2', y: 4 }, { x: '3', y: 6 }]}
            titlePosition='center'
            titleFontSize={18}
          />
        </Col>
        <Col span={6}>
          <Bar
            title='坐卧体前屈'
            data={[{ x: '1', y: 2 }, { x: '2', y: 4 }, { x: '3', y: 6 }]}
            transpose={true}
            titlePosition='center'
            titleFontSize={18}
          />
        </Col>
        <Col span={6}>
          <Bar
            title='引体向上'
            data={[{ x: '1', y: 2 }, { x: '2', y: 4 }, { x: '3', y: 6 }]}
            titlePosition='center'
            titleFontSize={18}
          />
        </Col>
      </Row>
  </Card>
)

export default TestNumber;
