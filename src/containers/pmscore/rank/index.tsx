import React, { useCallback, useState, useEffect } from 'react';
import SimpleForm from './components/SimpleForm';
import StandardTable, { StandardTableColumnProps } from 'components/StandardTable';
import { NavLink } from 'react-router-dom';
import { Card, message } from 'antd';
import request from 'utils/request';
import { isSuccess } from 'utils';

const defaultParams = {
  pageNo: 1,
  pageSize: 10,
  itemId: 9
}


const List: React.FC = () => {
  const [params, setParams] = useState<any>(defaultParams);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const columns: StandardTableColumnProps[] = [
    {
      title: "名次",
      render: (val, row: any, index) => {
        const order = index + 1 + ((params.pageNo - 1) * params.pageSize)
        let color = '#848484';
        let background = '#F7F7F7'
        if (order === 1) {
          color = "#F1758A";
          background = "#FDE0E5";
        } else if (order === 2) {
          color = "#50A6FC";
          background = "#DBECFE";
        } else if (order === 3) {
          color = "#79D391";
          background = "#DFF5E4";
        }
        return <span style={{
          color: color, background, padding: '0 4px', borderRadius: 4
        }}>{index + 1 + ((params.pageNo - 1) * params.pageSize)}</span>;
      }
    },
    {
      title: "姓名",
      dataIndex: "name",
      render: (val, row) => {
        return <>{row.headPic ? <img style={{ width: 40, borderRadius: '50%', marginRight: 10 }} src={row.headPic} alt="" /> : null}{val}</>
      }
    },
    {
      title: "成绩",
      dataIndex: "score"
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val: number) => {
        return val ? '男' : '女';
      }
    },
    {
      title: "年龄",
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
    if (!params.itemId) {
      message.info('请选择项目后再搜索～')
      return
    }
    const res = await request({
      url: "/result/sortList",
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
    console.log('formParams', formParams)
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