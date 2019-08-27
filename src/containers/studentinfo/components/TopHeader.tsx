import React from 'react';
import styles from './TopHeader.module.less'
import { Tag} from 'antd';

interface TopHeaderProps {
  currentStudent?: any;
}
const TopHeader = ({ currentStudent }: TopHeaderProps) => {
  return (
    <>
      <div className={styles.container}>
        <img
          src={require("../../../assets/avatar.png")}
          alt=""
          className={styles.avatar}
        />
        <div className={styles.infoBox}>
          <p>刘雪华</p>
          <p>
            <span>22岁</span>
            <span>166厘米</span>
            <span>50公斤</span>
          </p>
          <p className={styles.tagList}>
            <span>20183393122</span>
            <span>社会体育系</span>
            <span>2018级</span>
            <span>一班</span>
          </p>
          <p>
            <Tag color="blue">跳远高手</Tag>
            <Tag color="blue">冲刺好手</Tag>
          </p>
        </div>
      </div>
    </>
  );
};

export default TopHeader;