import React, { useEffect, useState } from 'react';
import StandardTable, { StandardTableColumnProps } from 'components/StandardTable';
import { isSuccess } from 'utils';
import request from 'utils/request';
import { Link } from 'react-router-dom';

const defaultParams = {
  pageNo: 1,
  pageSize: 10,
}

const RecordList: React.FC<any> = (props) => {
  const { daysType, id } = props;

  const [list, setList] = useState([]);
  const [params, setParams] = useState(defaultParams);
  const [total, setTotal] = useState(0);

  const handleStandardTableChange = (pagination: any) => {
    setParams(info => ({
      ...info,
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    }));
  };

  const data = {
    list,
    pagination: {
      current: params.pageNo,
      pageSize: params.pageSize,
      total
    }
  };

  const columns: StandardTableColumnProps[] = [
    {
      title: '时间',
      align: 'center',
      dataIndex: 'endDate',
    },
    {
      title: '项目',
      align: 'center',
      dataIndex: 'itemName',
    },
    {
      title: '成绩',
      align: 'center',
      dataIndex: 'score',
      render: (_, record) => {
        return record.score + record.unit
      }
    },
    {
      title: '评分',
      align: 'center',
      dataIndex: 'mark',
    },
    {
      title: '评定',
      align: 'center',
      dataIndex: 'level',
    },
    {
      title: '操作',
      align: 'center',
      render: (val, record) => {
        return <Link to={`/studentinfo/${id}/profile?itemId=${record.itemId}&resultId=${record.resultId}`}>查看详情</Link>
      }
    },
  ]

  const onClickDetail = (record: any) => {
    console.log(record)
  }
  const fecthList = async (daysType: number, id: string) => {
    if (!id) {
      return
    }
    const res = await request({
      url: "/conner/record",
      data: {
        connerDate: daysType,
        id,
        ...params
      }
    });
    if (isSuccess(res)) {
      setList(res.data.rows);
      setTotal(res.data.total);
    }
  };

  useEffect(() => {
    fecthList(daysType, id)
  }, [daysType, id, params])

  return <div style={{ margin: ' 0 10px', background: '#fff', borderRadius: 5 }}>
    <StandardTable
      rowKey={r => r.resultId}
      columns={columns}
      data={data}
      onChange={handleStandardTableChange}
    />
  </div>
}


export default RecordList
