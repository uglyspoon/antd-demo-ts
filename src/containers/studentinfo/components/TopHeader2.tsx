import React from 'react';
import styles from './TopHeader.module.less'
import { Tag, Button } from 'antd';
import classnames from 'classnames';
import { withRouter, RouteComponentProps, NavLink } from 'react-router-dom';


interface TopHeaderProps extends RouteComponentProps {
  studentInfo?: any;
  title?: string;
  data?: any;
  id?: string;
  showScore?: boolean;
}

const TopHeader = ({ studentInfo, history, title = "立定跳远测试报告", data = {}, showScore = true }: TopHeaderProps) => {
  const { name, height, grade, college, clazz, age, sex, sexStr, sn, weight, headPic, } = studentInfo;
  console.log('data', data)
  const onClickBack = (e: React.MouseEvent) => {
    e.preventDefault();
    history.goBack()
  }
  return (
    <>
      <div className={styles.topBox}>
        <a href="" onClick={onClickBack} style={{ padding: 10 }}><img src={require('assets/向右@2x.png')} alt="" style={{ transform: 'rotate(180deg)', width: 10 }} /> </a>
        <h1>{title}</h1>
        <div>
          <span className={styles.exportLink}>报告导出 <img src={require('../../../assets/导出@2x.png')} alt="" /></span>
          <span className={styles.exportLink}>打印 <img src={require('../../../assets/打印@2x.png')} alt="" /></span>
        </div>
      </div>
      <div className={classnames([styles.container, styles.container2])}>
        <div className={styles.centerBox}>
          <img src={headPic} alt="" />
          <div>
            <p className={styles.title}>刘华 <img src={require('assets/male.png')} alt="" />
              {!showScore ? <div className={styles.champ}>长跑冠军</div> : null}
            </p>
            <p><span>{sn}</span><span>{grade}</span><span>{clazz}</span></p>
          </div>
        </div>
        {
          showScore ?
            <div className={styles.scoreBox}>
              <div className={styles.bestBox}>
                <img src={require('assets/徽章-会员@2x.png')} alt="" />
                <div>
                  <span>最好成绩</span>
                  <span>Best score</span>
                </div>
              </div>
              <div>
                <p>距离</p>
                <p>{data.maxScore} <span>{data.scoreUnit}</span></p>
              </div>
              <div>
                <p>得分</p>
                <p>{data.maxMark} <span>分</span></p>
              </div>
              <div>
                <p>等级</p>
                <p>{data.level} </p>
              </div>
              <div>
                <p>排名</p>
                <p>NO.{data.ranking}</p>
              </div>
              <div>
                <p>得分时间</p>
                <p>{data.scoreDate ? data.scoreDate.split(' ')[0] : '--'} <span>{data.scoreDate ? data.scoreDate.split(' ')[1] : '--'}</span></p>
              </div>
            </div> : null
        }
      </div>
    </>
  );
};

export default withRouter(TopHeader);