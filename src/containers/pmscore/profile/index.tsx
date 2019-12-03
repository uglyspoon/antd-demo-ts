import React, { useEffect, useState } from 'react';
// import styles from './style.less';
import TestNumber2 from './components/TestNumber2';
import HistoryScore2 from './components/HistoryScore2';
import HistoryQual2 from './components/HistoryQual2';
import { ProfileData } from './data.d';
import request from 'utils/request';
import { isSuccess } from 'utils';

interface profileProps {
  profile: ProfileData;
  loading: boolean;
}


const Profile: React.FC<profileProps> = ({ loading, profile }) => {
  //chart1
  const [testNumberType, setTestNumber] = useState(11);
  const [top3Type, setTop3Type] = useState(11);
  const [qualType, setQualType] = useState(11);
  const [testData, setTestData] = useState<any>([])
  const [top3Data, setTop3Data] = useState<any>([])
  const [qualData, setQualData] = useState<any>([])

  const handleChangeTest = (selecdValue: number) => {
    setTestNumber(selecdValue)
  }
  const handleChangeHistoryScore = (selecdValue: number) => {
    setTop3Type(selecdValue)
  }
  const handleChangeHistoryQual = (selecdValue: number) => {
    setQualType(selecdValue)
  }

  const AsyncFetchTest = async () => {
    const res = await request({
      url: "/result/testPeople",
      data: {
        resultDate: testNumberType
      }
    });
    if (isSuccess(res)) {
      setTestData(res.data.map((item: any) => ({ x: item.item, y: item.count })));
    }
  }

  const AsyncFetchTop3 = async () => {
    const res = await request({
      url: "/result/historyTop",
      data: {
        resultDate: top3Type
      }
    });

    if (isSuccess(res)) {
      const title = res.data.map((i: any) => i.itemName)
      const top1 = res.data.map((i: any) => ({ val: i.scoreList[0], unit: i.unit }))
      const top2 = res.data.map((i: any) => ({ val: i.scoreList[1], unit: i.unit }))
      const top3 = res.data.map((i: any) => ({ val: i.scoreList[2], unit: i.unit }))
      setTop3Data({
        title,
        top1,
        top2,
        top3
      });
    }
  }

  const AsyncFetchQual = async () => {
    const res = await request({
      url: "/result/historyPass",
      data: {
        resultDate: qualType
      }
    });
    if (isSuccess(res)) {
      // setTestData(res.data.map((item: any) => ({ x: item.item, y: item.count })));
      setQualData(res.data)
    }
  }

  useEffect(() => {
    AsyncFetchTest();
  }, [testNumberType])

  useEffect(() => {
    AsyncFetchTop3();
  }, [top3Type])

  useEffect(() => {
    AsyncFetchQual()
  }, [qualType])

  return (
    <div style={{ background: '#fff', padding: '0 20px' }}>
      <TestNumber2
        handleChange={handleChangeTest}
        data={testData}
      />
      <HistoryScore2
        handleChange={handleChangeHistoryScore}
        data={top3Data}
      />
      <HistoryQual2
        handleChange={handleChangeHistoryQual}
        data={qualData}
      />
    </div>
  )
}
export default Profile;

