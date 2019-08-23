import React from 'react';
import SimpleForm from './components/SimpleForm';
import StandardTable, {StandardTableColumnProps} from 'components/StandardTable';

const data = {
  list:[],
  pagination: {
    current: 0,
    pageSize: 10,
    total:0
  }
}

const columns:StandardTableColumnProps[] = [
  {
    title: '视频',
    dataIndex: 'name',
  },
  {
    title: '姓名',
    dataIndex: 'sexStr',
  },
  {
    title: '院系',
    dataIndex: 'age',
  },
  {
    title: '年级',
    dataIndex: 'sn',
  },
  {
    title: '班级',
    dataIndex: 'college',
  },
  {
    title: '日期',
    dataIndex: 'grade',
  },
  {
    title: '项目',
    dataIndex: 'clazz',
  },
  {
    title: '操作',
    dataIndex: 'clazz',
  },
]

const Video: React.FC = () => {
  return (
    <>
      <SimpleForm />
      <StandardTable columns={columns} data={data}/>
    </>
  )
}
export default Video
