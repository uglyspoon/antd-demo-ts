import React,{ useState, useEffect, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import request from 'utils/request';

interface Props extends RouteComponentProps{
}
const Detail: React.FC<Props> = ({ history }) => {
  const { location: { pathname } } = history;
  const [record, setRecord] = useState({})
  const fetchData = useCallback(() => {
    const res = request({
      url: '/plan/getBySn',
      data: {
        sn: pathname.split('/').pop()
      },
      method: 'get'
    })
    console.log('res', res)
  }, [pathname])
  useEffect(() => {
    fetchData()
    console.log(history)
  }, [])
  return <div>123</div>
}

export default withRouter(Detail);
