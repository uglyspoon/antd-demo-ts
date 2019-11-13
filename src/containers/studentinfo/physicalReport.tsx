import React, { useEffect, useState } from 'react';
import styles from './physicalReport.module.less';
import { Row, Col, Select, Button, Form, Input, Divider, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Donut from 'components/Charts/Donut';
import Stackedcolumn from 'components/Charts/Bar/Stackedcolumn';
import Series from 'components/Charts/Line';
import Bar from 'components/Charts/Bar';
import TopHeader from './components/TopHeader2';
import classNames from 'classnames';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { isSuccess } from 'utils';
import request from 'utils/request';
import _ from 'lodash';
import Column from 'components/Charts/Column';
import WaterWave from 'components/Charts/WaterWave';


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
const smile = require('../../assets/微笑.png');
const sad = require('../../assets/难过.png');

interface IProps extends FormComponentProps, RouteComponentProps {

}

const selectStyle: React.CSSProperties = { width: '100%' }

const PhysicalReport: React.FC<IProps> = ({ form, history }) => {
  const id: any = history.location.pathname.split('/').slice(-2).shift();

  const [studentInfo, setStudentInfo] = useState({})

  const [overShowData, setOverShow] = useState<any>({})
  const [baseBody, setBaseBody] = useState<any>({})
  const [columnType, setColumnType] = useState<number>(1)
  const [columnData, setColumnData] = useState<any>([])

  const [averageColumnData, setAverageColumnData] = useState<any>([])
  const [projectData, setProjectData] = useState<any>({})
  const [projectData2, setProjectData2] = useState<any>({})

  const handleChange = () => {

  }

  const onSubmit = (data: any) => {
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
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

  const fetchOverShow = async (id: string) => {
    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/overshow",
      data: {
        id
      }
    });
    if (isSuccess(res)) {
      setOverShow(res.data);
    }
  };

  const fetchBasicBody = async (id: string) => {
    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/basebody",
      data: {
        id
      }
    });
    if (isSuccess(res)) {
      setBaseBody(res.data);
    }
  };

  const fetchPhyHistogram = async (columnType: number, id: string) => {
    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/phyHistogram",
      data: {
        type: columnType,
        id,
      }
    });
    if (isSuccess(res)) {
      const newData = res.data.maxPhyHistogram.map((item: any) => ({
        label: item.item,
        '我的最高分': item.perScore,
        '班级最高分': item.claScore
      }))
      setColumnData(newData);
    }
  };

  const fetchAverageHistogram = async (columnType: number, id: string) => {
    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/phyHistogram",
      data: {
        type: columnType,
        id,
      }
    });
    if (isSuccess(res)) {
      const newData = res.data.maxPhyHistogram.map((item: any) => ({
        label: item.item,
        '我的平均分': item.perScore,
        '班级平均分': item.claScore
      }))
      setAverageColumnData(newData);
    }
  };

  const fetchProjectData = async (type: number, id: string) => {
    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/project",
      data: {
        id,
        type
      }
    });
    if (isSuccess(res)) {
      if (type === 1) {
        setProjectData(res.data);
      } else if (type === 2) {
        setProjectData2(res.data)
      }
    }
  };


  const { getFieldDecorator } = form;
  useEffect(() => {
    AsyncFetchDetail(id);
    fetchOverShow(id);
    fetchBasicBody(id);
    fetchPhyHistogram(columnType, id)
    fetchAverageHistogram(2, id)
    fetchProjectData(1, id)
    fetchProjectData(2, id)
  }, [])

  const getType = (type: any) => {
    if (type === 1) {
      return styles.type1
    } else if (type === 2) {
      return styles.type2
    } else if (type === 3) {
      return styles.type3
    } else {
      return styles.type4
    }
  }
  return <div>
    <TopHeader studentInfo={studentInfo} title={'体质报告'} showScore={false} />
    <div className={styles.container}>

      <div className={styles.performnaceContainer}>
        <p className={styles.title}>整体表现</p>
        <Row type="flex" align="middle" className={styles.performnace}>
          <Col span={4} className={styles.left}>
            <p></p>
            {/* <div className={styles.circle}> */}
            <WaterWave title={``} height={100} percent={overShowData.show || 0} />
            {/* ${overShowData.show}分 */}
            {/* {overShowData.show}分 */}
            {/* </div> */}
            <p className={styles.desc}>击败了{overShowData.beat}%的小伙伴</p>
          </Col>
          <Col span={1} className={styles.middle}>
            <Divider type="vertical" style={{ height: '90%', background: "#F6F6F6" }} />
          </Col>
          <Col span={19} className={styles.right}>
            {overShowData.labelVoList ? _.chunk(overShowData.labelVoList, 2).map((item: any, idx: number) => {
              return <div className={styles.flexBox} key={idx}>
                <div>{item[0].good ? <img src={smile} alt="" /> : <img src={sad} alt="" />}<span>{item[0].content}</span></div>
                <div>{item[1].good ? <img src={smile} alt="" /> : <img src={sad} alt="" />}<span>{item[1].content}</span></div>
              </div>
            }) : null}
            {/*          
          <div className={styles.flexBox}>
            <div><Icon type="smile" /><span>爆发力需要增强，可练习蹲跳</span></div>
            <div><Icon type="smile" /><span>腹部力量较弱，可练习仰卧起坐</span></div>
          </div>
          <div className={styles.flexBox}>
            <div><Icon type="smile" /><span>出色的弹跳能力</span></div>
            <div><Icon type="smile" /><span>健康的体脂率</span></div>
          </div>
          <div className={styles.flexBox}>
            <div><Icon type="smile" /><span>爆发力需要增强，可练习蹲跳</span></div>
            <div><Icon type="smile" /><span>腹部力量较弱，可练习仰卧起坐</span></div>
          </div> */}
          </Col>
        </Row>
      </div>
      <div className={styles.basicData}>
        <p className={styles.title}><strong>基础身体数据</strong></p>
        <Row type="flex" align="middle" className={classNames([styles.performnace, styles.fix])} >
          <Col span={4} className={styles.left}>
            <Row type="flex" align="middle">
              <Col span={12} >身高</Col>
              <Col span={12} > <strong>{baseBody.height}cm</strong></Col>
            </Row>
            <Row >
              <Col span={12} >体重</Col>
              <Col span={12} > <strong>{baseBody.weight}kg</strong></Col>
            </Row>
          </Col>
          <Col span={1} className={styles.middle}>
            <Divider type="vertical" style={{ height: '80%', background: "#F6F6F6" }} />
          </Col>
          <Col span={19} className={styles.right}>
            <Row>
              {baseBody.labelVoList ? baseBody.labelVoList.map((item: any, idx: number) => {
                return <Col span={6} key={idx}>
                  <div className={styles.dataBox}>
                    <div>
                      <p>{item.label}</p>
                      <p className={getType(item.level)}>{item.levelDes}</p>
                    </div>
                    <span>{item.value}</span>
                  </div>
                </Col>
              }) : null}
            </Row>
          </Col>
        </Row>
      </div>
      <div className={styles.physicalBox}>
        <p style={{ fontWeight: 'bold' }}> 体质测试</p>
        <Row gutter={30} style={{ height: 300 }} >
          <Col span={12}>
            <Column data={columnData} fields={["我的最高分", "班级最高分"]}></Column>
            {/* <Bar data={[{ x: '1', y: 2 }]} transpose /> */}
          </Col>
          <Col span={12}>
            <Column data={averageColumnData} fields={["我的平均分", "班级平均分"]}></Column>
          </Col>
        </Row>
        <div className={styles.dividerContainer}>
          <Divider style={{ background: '#F6F6F6', }} />
        </div>
        <Row gutter={30} style={{ height: 210 }} className={styles.antRow}>
          <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <p>擅长的项目</p>
            <div >
              <img src={require('../../assets/立定跳远@2x.png')} style={{ height: 80, width: 80, marginBottom: 20, border: '1px dashed #2DB8F1', borderRadius: 3 }} alt="" />
            </div>
            <p>{projectData.itemName}</p>
          </Col>
          <Col span={6} className={styles.subright2}>
            <div>最远距离 <span><b>{projectData.maxScore}</b><i>米</i></span></div>
            <div>最高得分 <span><b>{projectData.maxMark}</b><i>分</i></span></div>
            <div>最佳排名 <span><b>No.{projectData.ranking}</b></span></div>
          </Col>
          <Col span={6}>
            <Donut data={projectData.ringChart} padding={[30, 30, 30, 30]} />
          </Col>
          <Col span={6}>
            {projectData.labelVoList ? projectData.labelVoList.map((item: any, idx: number) => {
              return <div key={idx}> {item.good ? <img src={smile} alt="" /> : <img src={sad} alt="" />}<span>{item.content}</span></div>
            }) : null}
          </Col>
        </Row>
        <div className={styles.dividerContainer}>
          <Divider style={{ background: '#F6F6F6', }} />
        </div>
        <Row gutter={30} style={{ height: 210 }} className={styles.antRow}>
          <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <p>需提高的项目</p>
            <div>
              <img src={require('../../assets/跑步@2x.png')} style={{ height: 80, width: 80, marginBottom: 20, border: '1px dashed #2DB8F1', borderRadius: 3 }} alt="" />
            </div>
            <p>{projectData2.itemName}</p>
          </Col>
          <Col span={6} className={styles.subright2}>
            <div>最好成绩 <span><b>{projectData2.maxScore}</b><i>秒</i></span></div>
            <div>最高得分 <span><b>{projectData2.maxMark}</b><i>分</i></span></div>
            <div>最佳排名 <span><b>No.{projectData2.ranking}</b></span></div>
          </Col>
          <Col span={6}>
            <Donut data={projectData2.ringChart} padding={[30, 30, 30, 30]} />
          </Col>
          <Col span={6}>
            {projectData2.labelVoList ? projectData2.labelVoList.map((item: any, idx: number) => {
              return <div key={idx}> {item.good ? <img src={smile} alt="" /> : <img src={sad} alt="" />}<span>{item.content}</span></div>
            }) : null}
          </Col>
        </Row>
      </div>
      <div className={styles.advice}>
        <p className={styles.title} style={{ fontWeight: 'bold' }}>体质训练建议</p>
        <div><p>&emsp;&emsp;提升爆发力和力量协调训练，增强核心稳定性，优化上肢稳定性。</p>
          <p>&emsp;&emsp;膝关节功能训练：膝关节周围肌群的力量配比协调，爆发用力时的关节稳定性控制是功能训练的重点。常用方法：平衡垫上单腿下蹲、平衡盘上负重蹲伸等。</p>
          <p>&emsp;&emsp;核心部位功能训练：可起到调节身体重心、控制骨盆稳定和协同上下肢动力链连贯的作用。常用方法：平衡垫上负重转体练习、平衡板侧卧位支撑练习等。</p>
          <p>&emsp;&emsp;上肢功能训练：良好的上肢力量分布有助于技术动作的经济性和实效性。常用方法：平衡垫上单臂提拉练习等。</p></div>
      </div>
    </div>
  </div>
}
export default Form.create()(withRouter(PhysicalReport))