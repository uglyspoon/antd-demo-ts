import React, { useEffect, useState } from 'react';
import styles from './profile.module.less';
import { Row, Col, Divider } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import request from 'utils/request';
import { isSuccess } from 'utils';
import studentinfo from '.';
const queryString = require('query-string');


interface IProps extends RouteComponentProps {

}
interface queryProps {
  itemId: string;
  resultId: string;
}
const Profile: React.FC<IProps> = ({ history }) => {
  const id: any = history.location.pathname.split('/').slice(-2).shift();
  const [studentInfo, setStudentInfo] = useState<any>({})
  const [resultDetail, setResultDetail] = useState<any>({})

  const query: queryProps = queryString.parse(history.location.search)
  const [data, setData] = useState<any>({})
  const [isJump, setIsJump] = useState<boolean>(true);

  const fetchData = async (id: string) => {

    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/resultQuota",
      data: {
        id,
        itemId: query.itemId,
        resultId: query.resultId
      }
    });
    if (isSuccess(res)) {
      setData(res.data);
    }
  };


  const AsyncFetchDetail = async (id: string | undefined) => {

    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/detail",
      data: {
        id
      }
    });
    if (isSuccess(res)) {
      setStudentInfo(res.data);

    }
  };

  const getScore = async (resultId: string) => {

    if (!id) {
      return
    }
    const res = await request({
      url: "/result/detail",
      data: {
        resultId
      }
    });
    if (isSuccess(res)) {
      setResultDetail(res.data);
      if (res.data.itemName !== '立定跳远') {
        setIsJump(false)
      }
    }
  };


  useEffect(() => {
    AsyncFetchDetail(id)
    fetchData(id)
    getScore(query.resultId)
  }, [])

  const { name, height, grade, college, clazz, age, sex, sexStr, sn, weight, headPic } = studentInfo;

  return <div className={styles.container}>
    <div className={styles.header}>
      <Row gutter={30}>
        <Col span={8} className={styles.left}>
          <img src={headPic} alt="" />
          <div>
            <div><strong>{name}</strong><img src={sex ? require('assets/male.png') : require('assets/female.png')} alt="" /> <span>{age}</span><span>岁</span></div>
            <div><span>{sn}</span><span>{college}</span></div>
            <div><span>{grade}{clazz}</span></div>
          </div>
        </Col>
        <Col span={8} className={styles.middle}>
          <div className={styles.back2}>
            <span>评分</span>
            <div>
              <em>{resultDetail.mark}</em>
              <em>分</em>
            </div>
          </div>
        </Col>
        <Col span={8} className={styles.right}>
          <p>成绩表</p>
          <p>REPORT</p>
          <p>CARD</p>
        </Col>
      </Row>
    </div>
    <div className={styles.content}>
      <div className={styles.contentHeader}>
        <p>
          {resultDetail.itemName}
        </p>
        <p>
          测试时间：{resultDetail.createDate}
        </p>
      </div>
      <Row className={styles.box1}>
        <Col span={12}>
          <div className={styles.boxLeft}>
            <p>成绩</p>
            <p>
              <strong>
                {resultDetail.score}
              </strong>
              <span>{resultDetail.unit}</span>
            </p>
            <div>
              <div>
                <img src={require('assets/查看得分详情@2x.png')} alt="" />
                得分
              </div>
              <div>
                <img src={require('assets/等级@2x.png')} alt="" />
                等级
              </div>
            </div>
            <div>
              <div>{resultDetail.mark}<span> 分</span> </div>
              <div>{resultDetail.level}</div>
            </div>
          </div>

        </Col>
        <Col span={12}>
          <div className={styles.boxRight}>
            <p>
              更多指标
            </p>
            {data.ringChart ? <div>
              <div>
                <img src={require('assets/起跳角度@2x.png')} alt="" />
                起跳角度
                <div>
                  {isJump ? data.ringChart[0]['score'] : '-'}
                  <span>{data.ringChart[0]['unit']}</span>
                </div>
              </div>
              <div>
                <img src={require('assets/屈臂角度@2x.png')} alt="" />
                屈臂角度
                <div>
                  {isJump ? data.ringChart[1]['score'] : '-'}
                  <span>{data.ringChart[1]['unit']}</span>
                </div>
              </div>
              <div>
                <img src={require('assets/平均速度@2x.png')} alt="" />
                平均速度
                <div>
                  {isJump ? data.ringChart[2]['score'] : '-'}
                  <span>{data.ringChart[2]['unit']}</span>
                </div>
              </div>
              <div>
                <img src={require('assets/离地时间@2x.png')} alt="" />
                腾空时间
                <div>
                  {isJump ? data.ringChart[3]['score'] : '-'}
                  <span>{data.ringChart[3]['unit']}</span>
                </div>
              </div>
              <div>
                <img src={require('assets/离地高度@2x.png')} alt="" />
                腾空高度
                <div>
                  {isJump ? data.ringChart[4]['score'] : '-'}
                  <span> {data.ringChart[4]['unit']}</span>
                </div>
              </div>
              <div>
                <img src={require('assets/落地角度@2x.png')} alt="" />
                落地角度
                <div>
                  {isJump ? data.ringChart[5]['score'] : '-'}
                  <span> {data.ringChart[5]['unit']}</span>
                </div>
              </div>
            </div> : null}

          </div>
        </Col>
      </Row>

      <Divider dashed />
      <div className={styles.bottom}>
        <p>成绩点评</p>
        <div>
          <p>{data.stateDesc}</p>
        </div>
      </div>
    </div>
  </div>
}

export default withRouter(Profile);

