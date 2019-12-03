import React, { useState, MouseEvent, useCallback, useEffect } from 'react';
import styles from './style.module.less';
import { ProfileData } from './data';
import { Row, Col, Button, Modal, Alert, Icon, message, Card } from 'antd';
import MyDropzone from './components/Dropzone';
import request from 'utils/request';
import configs from 'utils/config';
import StandardTable, { StandardTableColumnProps } from 'components/StandardTable';
import DetailForm from './components/DetailForm';
import { isSuccess } from 'utils';
import queryString from 'query-string';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import moment from 'moment';


const defaultParams = {
  pageNo: 1,
  pageSize: 10,
  itemId: 9
}

interface IProps extends RouteComponentProps {

}

type queryProps = {
  date111: string;
}
const Record: React.FC<IProps> = ({ history }) => {
  const [params, setParams] = useState<any>(defaultParams);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const query: any = queryString.parse(history.location.search)


  const columns: StandardTableColumnProps[] = [
    {
      title: '项目',
      dataIndex: 'itemName',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '成绩',
      dataIndex: 'mark',
      render: (val, row) => <>{row.mark}{row.unit}</>
    },
    {
      title: '评分',
      dataIndex: 'score',
    },
    {
      title: '评定',
      dataIndex: 'level',
    },
    {
      title: '学号',
      dataIndex: 'connerSn',
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
    params.date = query.date
    params.identy = 1
    const res = await request({
      url: "/result/sortList",
      data: params
    });
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
      <Card>
        <Row type="flex" justify="space-between">
          <p style={{ color: '#002766', fontSize: 16, fontWeight: 600 }}>{moment(query.date, 'YYYY-MM-DD').format('MM月DD日')}体测详情</p>
        </Row>
        <DetailForm handleSearch={handleSearch} resetForm={resetForm} style={{ marginBottom: 20 }} />
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
export default withRouter(Record);

