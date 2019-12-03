import React from 'react';
import styles from './TopHeader.module.less'
import { Tag, Button } from 'antd';
import { Link } from 'react-router-dom';

interface TopHeaderProps {
  studentInfo?: any;
  id: string;
}
const TopHeader = ({ studentInfo, id }: TopHeaderProps) => {
  const { name, height, grade, college, clazz, age, sex, sexStr, sn, weight, headPic } = studentInfo;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <img
            src={headPic}
            alt=""
            className={styles.avatar}
          />
          <div className={styles.infoBox}>
            <p className={styles.title}>
              {name}
              <img src={sex ? require('assets/male.png') : require('assets/female.png')} alt="" />
              <div className={styles.champ}>长跑冠军</div>
            </p>
            <p>
              <span><b>{height}</b>厘米</span>
              <span><b>{age}</b>岁</span>
              <span><b>{weight}</b>公斤</span>
            </p>
            <p className={styles.tagList}>
              <span>{sn}</span>
              <span>{college}</span>
              <span>{grade}</span>
              <span>{clazz}</span>
            </p>
            <p>
              <Tag >跳远高手</Tag>
              <Tag >冲刺好手</Tag>
            </p>
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.rightHeader}>
            {/* <div>
              <img src={require('../../../assets/荣誉 金牌.png')} alt="" />
              <p>跳远冠军</p>
            </div>
            <div>
              <img src={require('../../../assets/荣誉 金牌.png')} alt="" />
              <p> 长跑冠军</p>
            </div> */}
          </div>
          <Link
            to={`/studentinfo/${id}/physicalReport`}
          >
            <Button type="primary" style={{ width: '100%', marginTop: 15, borderRadius: 30 }}> 查看体质报告</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopHeader;