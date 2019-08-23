import React, {useState, useEffect, useCallback, useMemo} from 'react';
import SimpleForm from './components/SimpleForm';
import StandardTable, {StandardTableColumnProps} from 'components/StandardTable';
import { Divider, Card, message, Popconfirm } from 'antd';
import { withRouter,RouteComponentProps } from 'react-router-dom';
import request from 'utils/request';
import { isSuccess } from 'utils';

const noneListStyle = {
  padding: 0,
  margin: 0,
  listStyle: 'none',
}


const defaultParams = {
  pageNo: 1,
  pageSize: 10,
}

const Plan = ({ history }: RouteComponentProps) => {

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState(defaultParams)
  const jumpToDetail = (sn:string) => {
    history.push(`/plan/detail/${sn}`)
  }
  const canCelPlan = useCallback(async (sn:string) => {
    const res = await request({
      url: '/plan/cancel?sn='+sn,
      method:'get'
    })
    if (isSuccess(res)) {
      message.success('取消成功！')
      fetchData(params)
    }
  }, [])
  const fetchData = useCallback(async (params) => {
    const res = await request({
      url: '/plan/list',
      data: params
    })
    if (isSuccess(res)) {
      setList(res.data.rows)
      setTotal(res.data.total)
    }
  }, [params])

  useEffect(() => {
    fetchData(params)
  }, [params])

  const columns:StandardTableColumnProps[] = useMemo(() => [
    {
      title: '体测日期',
      dataIndex: 'testDate',
    },
    {
      title: '体测项目',
      dataIndex: 'render-1',
      render: (text, row, index) => {
        return <ul style={noneListStyle}>
          {row.itemList.map((item: any) => <li key={item.id}>{item.name}</li>)}
        </ul>
      }
    },
    {
      title: '体测班级',
      dataIndex: 'render-2',
      render: (text, row, index) => {
        return <ul style={noneListStyle}>
          {row.clazzList.map((item: any) => <li key={`${item.college}${item.grade}${item.clazz}`}>{item.college}{item.grade}{item.clazz}</li>)}
        </ul>
      }
    },
    {
      title: '体测人数',
      dataIndex: 'render-3',
      render: (text, row, index) => {
        return row.clazzList.map((item:any)=>+item.stuNum).reduce((a:number,b:number) => a+b) + '人'
      }
    },
    {
      title: '操作',
      render: (text, record, index) => {
        return (
          <>
            <a href="#" onClick={(e) => { e.preventDefault();jumpToDetail(record.sn) }}>详情</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定要取消此计划吗?"
              onConfirm={()=>canCelPlan(record.sn)}
              // onCancel={}
              okText='确定'
              cancelText="取消"
            >
              <a href="#" onClick={(e) => { e.preventDefault();}}>取消</a>
            </Popconfirm>
          </>
        )
      }
    },
  ], [])

  const handleStandardTableChange = (
    pagination: any,
  ) => {
    setParams(info => ({
      ...info,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    }))
  };

  const data = {
    list,
    pagination: {
      current: params.pageNo,
      pageSize: params.pageSize,
      total
    }
  }
  return (
    <Card>
      <SimpleForm />
      <StandardTable
        columns={columns}
        data={data}
        rowKey='sn'
        onChange={handleStandardTableChange}
      />
    </Card>
  )
}

export default withRouter(Plan);
