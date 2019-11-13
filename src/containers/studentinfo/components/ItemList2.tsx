import React, { useState, useEffect } from 'react';
import { Row, Col, Icon, Divider, Spin } from "antd";
import styles from './ItemList.module.less';

import Donut from "components/Charts/Donut";
import request from 'utils/request';
import { isSuccess } from 'utils';
import _ from 'lodash';
import { Link } from 'react-router-dom';


const Img1 = require('assets/立定跳远@2x.png');
const Img2 = require('assets/跳绳@2x.png');
const Img3 = require('assets/跑步@2x.png');
const Img4 = require('assets/引体向上@2x.png');


const onClickDetail = (e: React.MouseEvent) => {
  e.preventDefault()
  console.log(123)

}
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
interface IProps {
  id: string | number;
  days: number;
}
type ItemProp = {
  name: string;
  id: number;
  [k: string]: any;
}
const newData: any[] = [0, 0, 0, 0]
let count = 0
const ItemList: React.FC<IProps> = ({ id, days }) => {
  const [itemList, setItemList] = useState([
    { id: 9, name: '立定跳远' },
    { id: 11, name: '引体向上' },
    { id: 3, name: "50米跑" },
    { id: 17, name: '跳绳' }
  ])

  const [loading, setLoading] = useState(false);


  const getImg = (id: number) => {
    if (id === 9) {
      return Img1
    } else if (id === 11) {
      return Img4
    } else if (id === 3) {
      return Img3
    } else if (id === 17) {
      return Img2
    }
  }

  useEffect(() => {
    setLoading(true)
    itemList.forEach(async (item: ItemProp, idx: number) => {
      const res = await getRingData(item, item.id, days)

      itemList.some((ele, index) => {
        if (ele.id === res.id) {
          newData[index] = res
          count++;
          return true
        }
      })

      if (count === 4) {
        setLoading(false)
        setItemList(newData)
        count = 0;
      }

    })

  }, [days])

  const getRingData = async (item: ItemProp, itemId: string | number, days: number) => {
    const res = await request({
      url: "/conner/ringChart",
      data: {
        connerDate: days,
        id,
        itemId
      }
    });
    const scoreData = await request({
      url: "/conner/connerItem",
      data: {
        connerDate: days,
        id,
        itemId
      }
    });
    if (isSuccess(res) && isSuccess(scoreData)) {
      return Object.assign({}, item, res.data, scoreData.data)
    }
  }
  const renderLoading = (height: number) => {
    return <div style={{ display: 'flex', height: height, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Spin size="large" />
    </div>
  }
  return (
    <div className={styles.ItemContainer} >
      <div className={styles.rowContainer} >
        {
          !loading ? itemList.map((item: any, idx) => {
            return <div className={styles.rowItem} key={item.id}>
              <p>
                <span className={styles.cardName}><img src={getImg(item.id)} alt="" style={{ width: 22, marginLeft: 10 }} /><span>{item.name}</span></span>
                <Link
                  to={`/studentinfo/${id}/testReport?name=${item.name}&id=${item.id}`}
                > 详细报告  ></Link>
              </p>
              <div><Divider style={{ background: '#DEDEDE' }} /></div>
              <div className={styles.bottomBox}>
                <div className={styles.scoreBox}>
                  <div>
                    <span>最佳成绩</span>
                    <strong>{item.maxScore} {item.scoreUnit}</strong>
                  </div>
                  <div>
                    <span>最佳得分</span>
                    <strong>{item.maxMark}分</strong>
                  </div>
                  <div>
                    <span>班级前</span>
                    <strong>{item.befRanking}%</strong>
                  </div>
                  <div>
                    <span>班级排名</span>
                    <strong>No.{item.ranking}</strong>
                  </div>
                </div>
                <div className={styles.chartBox}>
                  <Donut height={190} width={180} data={item.ringChart} padding={'auto'} title={'成绩分布'} showLabel={false} showText />
                </div>
              </div>
            </div>
          }) : renderLoading(600)
        }
      </div>

    </div >
  );
}

export default ItemList;