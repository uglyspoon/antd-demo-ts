import React, {useEffect, useState,} from 'react';
import styles from './style.module.less';
import { ProfileData } from './data.d';
import { Row, Col, Button, Card } from 'antd';
import request from 'utils/request';
import StandardTable, {StandardTableColumnProps} from 'components/StandardTable';
import SimpleForm from './components/SimpleForm';
import { isSuccess } from 'utils';
import UploadDataModal from './components/DataModal';
import UploadPicModal from './components/PicModal';


interface profileProps {
  profile: ProfileData;
  loading: boolean;
}

const defaultParams = {
  pageNo: 1,
  pageSize: 10,
}

const columns:StandardTableColumnProps[] = [
  {
    title: '学生',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sexStr',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '学号',
    dataIndex: 'sn',
  },
  {
    title: '院系',
    dataIndex: 'college',
  },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '班级',
    dataIndex: 'clazz',
  },
]

const Record: React.FC<profileProps> = ({ loading, profile }) => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState(defaultParams)
  const [visible, setVisible] = useState(false)
  const [picVisible, setPicVisible]  = useState(false)

  const togglePicVisible = () => {
    setPicVisible(visible => !visible)
  }
  const toggleVisible = () => {
    setVisible(visible => !visible)
  }
  const handleStandardTableChange = (
    pagination: any,
  ) => {
    console.log('pagination', pagination)
    setParams(info => ({
      ...info,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    }))
  };
  const AsyncFetchList = async () => {
    const res = await request({
      url: '/conner/list',
      data: params
    })
    if (isSuccess(res)) {
      setList(res.data.rows)
      setTotal(res.data.total)
    }
  }

  useEffect(() => {
    AsyncFetchList()
  }, [params])

  return (
    <Card >
      <Row type="flex" justify="end" >
        <Col >
          <Button type="primary" onClick={toggleVisible} icon="upload" >上传基础数据</Button>
          <Button type="primary" onClick={togglePicVisible} icon="upload" style={{marginRight: 20, marginLeft: 20}}>上传照片</Button>
        </Col>
      </Row>
      <SimpleForm style={{marginTop: 20}}/>
      <StandardTable
        rowKey='id'
        columns={columns}
        data={{
          list,
          pagination: {
            current: params.pageNo,
            pageSize: params.pageSize,
            total
          }
        }}
        onChange={handleStandardTableChange}
      />
      <UploadDataModal
        visible={visible}
        toggleVisible={toggleVisible}
      />
      <UploadPicModal
        visible={picVisible}
        toggleVisible={togglePicVisible}
      />

    </Card >
  )
}
export default Record;

