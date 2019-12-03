import React, { useState, MouseEvent, useCallback, useEffect } from 'react';
import styles from './style.module.less';
import { ProfileData } from './data.d';
import { Row, Col, Button, Modal, Alert, Icon, message, Card } from 'antd';
import MyDropzone from './components/Dropzone';
import request from 'utils/request';
import configs from 'utils/config';
import StandardTable, { StandardTableColumnProps } from 'components/StandardTable';
import SimpleForm from './components/SimpleForm';
import { isSuccess } from 'utils';
import { NavLink } from 'react-router-dom';

const defaultParams = {
  pageNo: 1,
  pageSize: 10,
}


const Record: React.FC = () => {
  const [params, setParams] = useState<any>(defaultParams);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);


  const columns: StandardTableColumnProps[] = [
    {
      title: '日期',
      dataIndex: 'dateStr',
    },
    {
      title: <Row className={styles.customHeader}>
        <Col span={4}>
          项目
        </Col>
        <Col span={4}>
          总人次
        </Col>
        <Col span={4}>
          优秀
        </Col>
        <Col span={4}>
          良好
        </Col>
        <Col span={4}>
          合格
        </Col>
        <Col span={4}>
          不合格
        </Col>
      </Row>,
      render: (val, row) => <>
        {
          row.list.map((item: any) => <Row style={{ padding: '6px 0' }}>
            <Col span={4}>
              {item.itemName}
            </Col>
            <Col span={4}>
              {item.total}
            </Col>
            <Col span={4}>
              {item.level1}
            </Col>
            <Col span={4}>
              {item.level2}
            </Col>
            <Col span={4}>
              {item.level3}
            </Col>
            <Col span={4}>
              {item.level4}
            </Col>
          </Row>)
        }
      </>
    },
    {
      title: '操作',
      // dataIndex: 'dateStr',
      render: (val, row) => {
        return <><NavLink to={`/pmscore/record/detail?date=${row.dateStr}`} className={styles.customJump}>详情</NavLink></>
      }
    },
  ]

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

    const res = await request({
      url: "/result/dateRecord",
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

  return (
    <div className={styles.container}>
      <Card >
        <SimpleForm handleSearch={handleSearch} resetForm={resetForm} style={{ marginBottom: 20 }} />
        <StandardTable
          rowKey="id"
          columns={columns}
          data={data}
          onChange={handleStandardTableChange}
        />
      </Card>
    </div>
  )
}
export default Record;

