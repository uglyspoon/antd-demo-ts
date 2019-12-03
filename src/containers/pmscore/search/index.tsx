import React, { useCallback, useState, useEffect } from 'react';
import SimpleForm from './components/SimpleForm';
import StandardTable, { StandardTableColumnProps } from 'components/StandardTable';
import { NavLink } from 'react-router-dom';
import { Card, message, Row, Col } from 'antd';
import request from 'utils/request';
import { isSuccess } from 'utils';

const defaultParams = {
  pageNo: 1,
  pageSize: 10,
  year: 2019,
}


const List: React.FC = () => {
  const [params, setParams] = useState<any>(defaultParams);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const columns: StandardTableColumnProps[] = [
    // 
    {
      title: "姓名",
      dataIndex: "name",
      render: (val, row) => {
        return <>{row.headPic ? <img style={{ width: 40, borderRadius: '50%', marginRight: 10 }} src={row.headPic} alt="" /> : null}{val}</>
      }
    },

    {
      title: "性别",
      dataIndex: "sex",
      render: (val: number) => {
        return val ? '男' : '女';
      }
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
      dataIndex: "age"
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


  const handleStandardTableChange = (pagination: any) => {
    setParams((info: any) => ({
      ...info,
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    }));
  };
  const AsyncFetchList = async () => {
    // if (!params.name) {
    //   return
    // }
    const res = await request({
      url: "/result/searchResult",
      data: params
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

  const handleSearch = useCallback((formParams: any) => {
    setParams({ ...params, ...formParams });
  }, []);

  const resetForm = useCallback(() => {
    setParams({ ...defaultParams });
  }, []);


  return <Card style={{ minHeight: '100%' }}>
    <SimpleForm handleSearch={handleSearch} resetForm={resetForm} style={{ marginBottom: 20 }} />
    <StandardTable
      rowKey="id"
      columns={columns}
      data={data}
      onChange={handleStandardTableChange}
    />
  </Card>
}


export default List;