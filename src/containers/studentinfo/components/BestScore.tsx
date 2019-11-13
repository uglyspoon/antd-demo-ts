import React from 'react';
import styles from './BestScore.module.less'
import { Tag, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

interface IProps {
  data: any;
  id: string;

}

export default (props: IProps) => {
  const { data, id } = props;
  console.log(data)
  return <Row className={styles.container}>
    <Col span={4} className={styles.leftBox}>
      <p>Best Score</p>
      <p>最好成绩</p>
    </Col>
    <Col span={20} className={styles.rightBox}>
      <div>
        <p>距离</p>
        <strong>{data.maxScore}米</strong>
      </div>
      <div>
        <p>得分</p>
        <strong>{data.maxMark}分</strong>
      </div>
      <div>
        <p>等级</p>
        <strong>{data.level}</strong>
      </div>
      <div>
        <p>
          排名
        </p>
        <strong>
          No.{data.ranking}
        </strong>
      </div>
      <div>
        <p>
          {/* <Link to={`/studentinfo/${id}/profile`}>查看详情 ></Link> */}
        </p>
        <p>
          <span>得分时间</span>
          <span className={styles.date}>{data.scoreDate ? data.scoreDate.split(' ')[0] : '--'} </span>
          <span>{data.scoreDate ? data.scoreDate.split(' ')[1] : '--'} </span>
        </p>
      </div>
    </Col>
  </Row>
}