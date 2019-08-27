import React from 'react';
import { Row, Col } from "antd";
import styles from './ItemList.module.less';

const ItemList = () => {
  return (
    <div className={styles.ItemContainer}>
      <Row type="flex" className={styles.rowContainer} justify="space-around">
        <Col span={6}>
          <p>
            <span>平均距离</span>
            <i>跳</i>
          </p>
          <em>1.63米</em>
          <p>
            比上个月
            <img src={require("../../../assets/trend-up.svg")} alt="" />
            {/* #D81E06 */}
            <span style={{ color: "#00C400" }}> 10.2%</span>
          </p>
        </Col>
        <Col span={6}>
          <p>
            <span>平均次数</span>
            <i>仰</i>
          </p>
          <em>45次</em>
          <p>
            比上个月
            <img src={require("../../../assets/trend-up.svg")} alt="" />
            {/* #D81E06 */}
            <span style={{ color: "#00C400" }}> 10.2%</span>
          </p>
        </Col>
        <Col span={6}>
          <p>
            <span>平均长度</span>
            <i>坐</i>
          </p>
          <em>4.2厘米</em>
          <p>
            比上个月
            <img src={require("../../../assets/trend-down.svg")} alt="" />
            {/* #D81E06 */}
            <span style={{ color: "#D81E06" }}> 10.2%</span>
          </p>
        </Col>
      </Row>
      <Row type="flex" className={styles.rowContainer} justify="space-around">
        <Col span={6}>
          <p>
            <span>最好成绩</span>
            <i>跳</i>
          </p>
          <em>1.78米</em>
          <p>
            比上个月
            <img src={require("../../../assets/trend-up.svg")} alt="" />
            {/* #D81E06 */}
            <span style={{ color: "#00C400" }}> 10.2%</span>
          </p>
        </Col>
        <Col span={6}>
          <p>
            <span>最好成绩</span>
            <i>仰</i>
          </p>
          <em>45次</em>
          <p>
            比上个月
            <img src={require("../../../assets/trend-up.svg")} alt="" />
            {/* #D81E06 */}
            <span style={{ color: "#00C400" }}> 10.2%</span>
          </p>
        </Col>
        <Col span={6}>
          <p>
            <span>最好成绩</span>
            <i>坐</i>
          </p>
          <em>6.8厘米</em>
          <p>
            比上个月
            <img src={require("../../../assets/trend-down.svg")} alt="" />
            {/* #D81E06 */}
            <span style={{ color: "#D81E06" }}> 10.2%</span>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default ItemList;