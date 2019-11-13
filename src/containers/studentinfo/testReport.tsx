import React, { useEffect, useState } from 'react';
import styles from './testReport.module.less';
import TopHeader2 from './components/TopHeader2';
import BestScore from './components/BestScore';

import { Tabs, Select, Menu, Dropdown, Icon, Row, Col, Button, Radio } from "antd";
import Donut from 'components/Charts/Donut';
import Doubleaxes from 'components/Charts/Bar/Doubleaxes';
import request from 'utils/request';
import { isSuccess } from 'utils';
import { RouteComponentProps } from 'react-router-dom';
import Radar from 'components/Charts/Radar';
import classNames from 'classnames';
const queryString = require('query-string');

const ButtonGroup = Button.Group;

const { Option } = Select;

const TabPane = Tabs.TabPane;
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
const menu = (func: Function) => {
  return <Menu>
    <Menu.Item>
      <a onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        func(1)
      }}>
        近30天
      </a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        func(2)
      }}>
        近60天
     </a>
    </Menu.Item>
    <Menu.Item>
      <a onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        func(3)
      }} >
        近90天
      </a>
    </Menu.Item>
  </Menu >
}

interface queryProps {
  id: string;
  name: string;
}
interface AverageDataProp {
  avgMark: number;
  avgRanking: number;
  avgScore: number;
  beat: number;
}
interface ringChartTypes {
  ringChart: { item: string, count: number }[]
}

interface HistogramTypes {
  histogram: {
    time: string,
    average: number,
    value: number,
  }[]
}

interface IProps extends RouteComponentProps {

}
const TestReport: React.FC<IProps> = ({ history }) => {
  const id: any = history.location.pathname.split('/').slice(-2).shift();
  const query: queryProps = queryString.parse(history.location.search)
  const [studentInfo, setStudentInfo] = useState({})
  const [scoreData, setScoreData] = useState({})
  const [averageData, setAverageData] = useState<AverageDataProp>({
    avgMark: 0,
    avgRanking: 0,
    avgScore: 0,
    beat: 0,
  })

  const [ringData, setRingData] = useState<ringChartTypes>({
    ringChart: [{
      item: 'item',
      count: 0,
    }]
  })

  const [histogramData, setHistogramData] = useState<HistogramTypes>({
    histogram: [{
      "time": "2019-11-04",
      "average": 1.65,
      "value": 1.68
    },]
  })
  const [radarData, setRadarData] = useState<any>({});

  const [daysType, setDaysType] = useState<number>(1);
  const [type, setType] = useState<number>(2); //2:天,3:周,4:月
  const [dayText, setDayText] = useState('近30天')

  const setDays = (daysType: number) => {
    setDaysType(daysType)

    setDayText(daysType === 1 ? '近30天' : (daysType === 2 ? '近60天' : '近90天'))
  }

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
    // const res = await axiosInstance.post("/conner/list", params);
    if (isSuccess(res)) {
      setStudentInfo(res.data);
      // setTotal(res.data.total);
    }
  };
  const fetchBestScore = async (id: string, itemId: string, daysType: number) => {

    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/connerItem",
      data: {
        connerDate: daysType,
        id,
        itemId
      }
    });
    // const res = await axiosInstance.post("/conner/list", params);
    if (isSuccess(res)) {
      setScoreData(res.data);
      // setTotal(res.data.total);
    }
  };

  const fetchAverage = async (id: string, itemId: string, daysType: number) => {

    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/avgScore",
      data: {
        connerDate: daysType,
        id,
        itemId
      }
    });
    // const res = await axiosInstance.post("/conner/list", params);
    if (isSuccess(res)) {
      setAverageData(res.data);
      // setTotal(res.data.total);
    }
  };

  const fetchRingData = async (id: string, itemId: string, daysType: number) => {

    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/ringChart",
      data: {
        connerDate: daysType,
        id,
        itemId
      }
    });
    if (isSuccess(res)) {
      setRingData(res.data);
    }
  };

  const fetchHistogramData = async (id: string, itemId: string, daysType: number, type: number) => {

    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/histogram",
      data: {
        connerDate: daysType,
        id,
        itemId,
        type
      }
    });
    if (isSuccess(res)) {
      const newDataArray: any[] = []
      res.data.histogram.forEach((item: any) => {
        newDataArray.push({
          time: item.date,
          '班级平均值': item.average,
          '我的成绩': item.value,
        })
      })
      console.log('newDataArray', newDataArray)
      setHistogramData(newDataArray as any);
    }
  };

  const fetchRadarData = async (id: string, itemId: string, daysType: number) => {
    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/radar",
      data: {
        connerDate: daysType,
        id,
        itemId
      }
    });
    if (isSuccess(res)) {
      const newRingData = res.data.ringChart.map((item: any) => ({
        item: item.date,
        '平均值': item.average,
        '我的成绩': item.value
      }))

      setRadarData({
        ...res.data,
        ringChart: newRingData,
      });
    }
  };

  useEffect(() => {
    AsyncFetchDetail(id)
    fetchBestScore(id, query.id, daysType)
    fetchAverage(id, query.id, daysType)
    fetchRingData(id, query.id, daysType)
    fetchHistogramData(id, query.id, daysType, type)
    fetchRadarData(id, query.id, daysType)
    // console.log('history', )
  }, [id, daysType])

  useEffect(() => {
    fetchHistogramData(id, query.id, daysType, type)
  }, [type])


  const handleRadioChange = (e: any) => {
    setType(e.target.value)
  }

  const operations = (
    <>
      <Dropdown overlay={menu(setDays)}>
        <span> {dayText} <Icon type="down" /></span>
      </Dropdown>
    </>
  );
  return (
    <div className={styles.container}>
      <TopHeader2 studentInfo={studentInfo} title={query.name + '测试报告'} data={scoreData} id={id} />
      {/* <BestScore data={scoreData} id={id} /> */}
      <div className={styles.content}>

        <div className={styles.profile}>
          <div className={styles.profileHead} >
            <p>测试分析</p>
            {operations}
          </div>
          <Row>
            <Col span={12} className={styles.left}>
              <div className={styles.leftTop}>
                <div className={styles.leftTopRank}>
                  <div className={styles.bottomText}>击败了{averageData.beat}%的小伙伴</div>
                  <div>
                    <p>平均成绩</p>
                    <strong>{averageData.avgScore}米</strong>
                  </div>
                  <div>
                    <p>平均得分</p>
                    <strong>{averageData.avgMark}分</strong>
                  </div>
                  <div>
                    <p>平均排名</p>
                    <strong>No.{averageData.avgRanking}</strong>
                  </div>
                </div>

              </div>
              <div className={styles.leftBottom}>
                <div>
                  <div className={styles.block}>
                    <img src={require('../../assets/起跳角度@2x.png')} className={styles.block} alt="" />
                  </div>
                  <span>起跳角度</span>
                  <strong>42.33度</strong>
                </div>
                <div>
                  <div className={styles.block}>
                    <img src={require('../../assets/屈臂角度@2x.png')} className={styles.block} alt="" />
                  </div>
                  <span>曲臂角度</span>
                  <strong>138.2度</strong>
                </div>
                <div>
                  <div className={styles.block}>
                    <img src={require('../../assets/平均速度@2x.png')} className={styles.block} alt="" />
                  </div>
                  <span>落地角度</span>
                  <strong>2.12米/秒</strong>
                </div>
                <div>
                  <div className={styles.block}>
                    <img src={require('../../assets/离地时间@2x.png')} className={styles.block} alt="" />
                  </div>
                  <span>腾空时间</span>
                  <strong>0.78秒</strong>
                </div>
                <div>
                  <div className={styles.block}>
                    <img src={require('../../assets/离地高度@2x.png')} className={styles.block} alt="" />
                  </div>
                  <span>腾空高度</span>
                  <strong>34.28厘米</strong>
                </div>
                <div>
                  <div className={styles.block}>
                    <img src={require('../../assets/落地角度@2x.png')} className={styles.block} alt="" />
                  </div>
                  <span>落地角度</span>
                  <strong>67.8度</strong>
                </div>
              </div>
            </Col>
            <Col span={12} className={styles.rightBox}>
              <Donut data={ringData.ringChart} height={350} width={270} padding={10} showText titleFontSize={'2em'} />
            </Col>
          </Row>
        </div>
        <div className={styles.doubleLine}>
          <Row type="flex" justify="space-between" align="middle" style={{ height: 55, borderBottom: '1px solid #dedede', marginBottom: 10 }}>
            <span className={styles.doubleLineTitle}>
              柱状图
            </span>
            <Radio.Group onChange={handleRadioChange} defaultValue={2}>
              <Radio.Button value={2}>天</Radio.Button>
              <Radio.Button value={3}>周</Radio.Button>
              <Radio.Button value={4}>月</Radio.Button>
            </Radio.Group>
            {/* <ButtonGroup >
              <Button onClick={() => setType(2)}>天</Button>
              <Button onClick={() => setType(3)}>周</Button>
              <Button onClick={() => setType(4)}>月</Button>
            </ButtonGroup> */}
          </Row>
          <Doubleaxes data={histogramData} height={330} />
        </div>
        <div className={classNames([styles.profile, styles.bottom])}>
          <Row gutter={30}>
            <Col span={12} className={classNames([styles.left, styles.fix])}>
              <div className={styles.leftTop}>
                <div className={styles.leftTopRank} >
                  <p>状态解读</p>
                </div>
                <div className={styles.bottomText}>{radarData.stateDesc}</div>
              </div>
              <div className={styles.leftBottom}>
                <p>训练建议</p>
                <span className={styles.bottomText}>
                  <ul>
                    {radarData.trainSuggest ? radarData.trainSuggest.split(',').map((item: any) => {
                      return <li>{item}</li>
                    }) : null}
                  </ul>
                </span>
              </div>
            </Col>
            <Col span={12} className={styles.rightBox}>
              {/* <Donut data={data} height={350} width={270} /> */}
              <Radar data={radarData.ringChart || []} height={400} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default TestReport;