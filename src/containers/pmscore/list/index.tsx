import React, { useCallback, useState, useEffect } from 'react';
import SimpleForm from './components/SimpleForm';
import StandardTable, { StandardTableColumnProps } from 'components/StandardTable';
import { NavLink } from 'react-router-dom';
import { Card, message, Row, Col } from 'antd';
import { isSuccess } from 'utils';
import request from 'utils/request';

const defaultParams = {
  pageNo: 1,
  pageSize: 10,
}


const List: React.FC = () => {
  const [params, setParams] = useState<any>(defaultParams);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const columnsA: StandardTableColumnProps[] = [
    {
      title: "项目",
      dataIndex: "itemName",
    },
    {
      title: "姓名",
      dataIndex: "name"
    },
    {
      title: "成绩",
      dataIndex: "score"
    },
    {
      title: "评分",
      dataIndex: "mark"
    },
    {
      title: "评定",
      dataIndex: "level"
    },
    {
      title: "学号",
      dataIndex: "connerSn"
    },
    {
      title: "院系",
      dataIndex: "college"
    },
    {
      title: "年级",
      dataIndex: "grade"
    },
    {
      title: "班级",
      dataIndex: "clazz"
    }
  ];

  const columnsB: StandardTableColumnProps[] = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: val => val ? '男' : '女'
    },
    {
      title: "项目/成绩",
      // dataIndex: "score"
      render: (val, row) => {
        return <>
          {
            row.results.map((item: any) => <Row>
              <Col xs={12} lg={6}>{item.itemName}</Col>
              <Col xs={12} lg={6}>{item.mark}{item.unit}</Col>
              <Col xs={12} lg={6}>{item.score}分</Col>
              <Col xs={12} lg={6}>{item.level}</Col>
            </Row>)
          }
        </>
      }
    },
    {
      title: "日期",
      dataIndex: "date"
    },
    {
      title: "院系",
      dataIndex: "college"
    },
    {
      title: "年级",
      dataIndex: "grade"
    },
    {
      title: "班级",
      dataIndex: "clazz"
    }
  ];

  const handleSearch = useCallback((formParams: any) => {
    setParams({ ...params, ...formParams });
  }, []);

  const resetForm = useCallback(() => {
    setParams({ ...defaultParams });
  }, []);

  const handleStandardTableChange = (pagination: any) => {
    setParams((info: any) => ({
      ...info,
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    }));
  };
  const AsyncFetchList = async () => {
    if (!params.type) {
      return
    }
    if (params.type === 'a' && !params.itemId) {
      message.info('请选择项目～')
      return
    }

    let url = ''
    console.log('type', params)
    if (params.type === 'b') {
      url = '/result/searchResult'
    } else {
      url = '/result/sortList'
    }

    const res = await request({
      url,
      data: { ...params, type: undefined }
    });
    // const res = await axiosInstance.post("/conner/list", params);
    // console.log(res)
    if (isSuccess(res)) {
      setList(res.data.rows);
      setTotal(res.data.total);
    }
  };

  useEffect(() => {
    AsyncFetchList();
  }, [params]);

  const data = {
    list,
    pagination: {
      current: params.pageNo,
      pageSize: params.pageSize,
      total
    }
  };

  return <Card style={{ minHeight: '100%' }}>
    <SimpleForm handleSearch={handleSearch} resetForm={resetForm} style={{ marginBottom: 20 }} />
    <StandardTable
      rowKey="id"
      columns={params.type === 'b' ? columnsB : columnsA}
      data={data}
      onChange={handleStandardTableChange}
    />
  </Card>
}


export default List;