import React, {useEffect, useState} from 'react';
// import styles from './style.less';
import TestNumber from './components/TestNumber';
import HistoryScore from './components/HistoryScore';
import HistoryQual from './components/HistoryQual';
import { ProfileData } from './data.d';

interface profileProps {
  profile: ProfileData;
  loading: boolean;
}


const Profile: React.FC<profileProps> = ({loading, profile}) => {
  //chart1
  const [testNumberType, setTestNumber] = useState('jack');
  const [top3Type, setTop3Type] = useState('jack');
  const [qualType, setQualType] = useState('jack');


  const handleChangeTest = (selecdValue: string) => {
    console.log('type', selecdValue)
    setTestNumber(selecdValue)
  }
  const handleChangeHistoryScore = (selecdValue: string) => {
    console.log('type', selecdValue)
    setTop3Type(selecdValue)
  }
  const handleChangeHistoryQual = (selecdValue: string) => {
    console.log('type', selecdValue)
    setQualType(selecdValue)
  }

  useEffect(() => {

  }, [testNumberType])

  useEffect(() => {
    // dispatch({
    //   type: 'profile/fetch',
    //   payload: {
    //     timePeriod: testNumberType
    //   }
    // })
  }, [top3Type])

  useEffect(() => {
    // dispatch({
    //   type: 'profile/fetch',
    //   payload: {
    //     timePeriod: testNumberType
    //   }
    // })
  }, [qualType])

  return (
    <>
      <TestNumber
        handleChange={handleChangeTest}
        data={[{x:'1', y:2}]}
      />
      <HistoryScore
        handleChange={handleChangeHistoryScore}
        data={[{x:'1', y:2}]}
      />
      <HistoryQual
        handleChange={handleChangeHistoryQual}
        data={[{x:'1', y:2}]}
      />
    </>
  )
}
export default Profile;

