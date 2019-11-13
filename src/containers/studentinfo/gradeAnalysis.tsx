import React from 'react';
import styles from './gradeAnalysis.module.less';
import { Row, Col, Select, Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Donut from 'components/Charts/Donut';
import Stackedcolumn from 'components/Charts/Bar/Stackedcolumn';
import Series from 'components/Charts/Line';
import Bar from 'components/Charts/Bar';

const { Option } = Select;
const data = [
  {
    item: "事例一",
    count: 40
  },
  {
    item: "事例二",
    count: 21
  },
  {
    item: "事例三",
    count: 17
  },
  {
    item: "事例四",
    count: 13
  },
  {
    item: "事例五",
    count: 9
  }
];
interface IProps extends FormComponentProps {

}

const selectStyle: React.CSSProperties = { width: '100%' }

const PhysicalReport: React.FC<IProps> = ({ form }) => {

  const handleChange = () => {

  }

  const onSubmit = (data: any) => {
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  const { getFieldDecorator } = form;

  return <div className={styles.physicalReport}>
    <Row gutter={30}>
      <Form onSubmit={onSubmit}>
        <Col span={5}>
          {getFieldDecorator(`field`, {
            rules: [
              {
                required: true,
                message: 'Input something!',
              },
            ],
          })(<Select style={selectStyle} onChange={handleChange} >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>)}

        </Col>
        <Col span={5}>
          {getFieldDecorator(`field1`)(
            <Select style={selectStyle}  >
              <Option value="jack">Jack</Option>
            </Select>
          )}
        </Col>
        <Col span={5}>
          {getFieldDecorator(`field2`)(
            <Select style={selectStyle}  >
              <Option value="jack">Jack</Option>
            </Select>
          )}
        </Col>
        <Col span={5}>
          {getFieldDecorator(`field3`)(
            <Select style={selectStyle}  >
              <Option value="jack">Jack</Option>
            </Select>
          )}
        </Col>
        <Col span={4}>
          <Button type="primary" htmlType="submit" >查询</Button>
        </Col>
      </Form>
    </Row>
    <Row gutter={40} className={styles.headerConatiner}>
      <Col span={8} >
        <div className={styles.headerBox}>
          <p>测试人数</p>
          <Row>
            <Col span={12} className={styles.left}>138人</Col>
            <Col span={12} className={styles.right}>
              <p>男生<span>80人</span></p>
              <p>女生<span>68人</span></p>
            </Col>
          </Row>
        </div>

      </Col>
      <Col span={8} >
        <div className={styles.headerBox}>
          <p>最好成绩</p>
          <Row className={styles.headerItem}>
            <Col span={8} >
              <p>男生</p>
            </Col>
            <Col span={8} >
              <span>1.90米</span>
            </Col>
            <Col span={8} >
              <span>90分</span>
            </Col>
          </Row>
          <Row className={styles.headerItem}>
            <Col span={8} >
              <p>男生</p>
            </Col>
            <Col span={8} >
              <span>1.90米</span>
            </Col>
            <Col span={8} >
              <span>90分</span>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={8} >
        <div className={styles.headerBox}>
          <p>平均成绩</p>
          <Row className={styles.headerItem}>
            <Col span={8} >
              <p>男生</p>
            </Col>
            <Col span={8} >
              <span>1.90米</span>
            </Col>
            <Col span={8} >
              <span>90分</span>
            </Col>
          </Row>
          <Row className={styles.headerItem}>
            <Col span={8} >
              <p>男生</p>
            </Col>
            <Col span={8} >
              <span>1.90米</span>
            </Col>
            <Col span={8} >
              <span>90分</span>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <Row className={styles.dountBox}>
      <Col span={8}>
        <p>所有学生</p>
        <Donut height={270} width={220} data={data} padding={[30, 30, 30, 50]} />
      </Col>
      <Col span={8}>
        <p>男生</p>
        <Donut height={270} width={220} data={data} padding={[30, 30, 30, 50]} />
      </Col>
      <Col span={8}>
        <p>女生</p>
        <Donut height={270} width={220} data={data} padding={[30, 30, 30, 50]} />
      </Col>
    </Row>
    <Row className={styles.chartBox} >
      <Stackedcolumn />
      <Series />
      <Bar data={[{ x: '1', y: 2 }]} title={' '} height={400} />
    </Row>

  </div>
}
export default Form.create()(PhysicalReport)