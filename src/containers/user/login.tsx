import React, { useState } from 'react';
import { Button, Icon, Input, Tooltip,message } from 'antd';
import styles from './login.module.less';
import request from 'utils/request';
// import cookie from 'react-cookie';
import config from 'utils/config';
import { useCookies } from 'react-cookie';
import { withRouter, RouteComponentProps} from 'react-router-dom';

// interface ChildComponentProps extends RouteComponentProps<any> {
//   /* other props for ChildComponent */
// }

const LoginPage:React.FC<RouteComponentProps> = ({history}) => {
  const [username, setUsername] = useState('15121053542');
  const [password, setPassword] = useState('dabai521');
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([config.TOKEN_KEY]);
  const handleSubmit = async () => {
    setLoading(true)
    const res = await request({
      url: '/igt/login', data: {
        username,
        password
      },
    })
    setLoading(true)
    if (res && res.status === 200) {
      setCookie(config.TOKEN_KEY, res.data, { path: '/' });
      // Router.push('/welcome')
      message.success('登录成功');
      history.push('/welcome');
    } else {
      message.success(`登录失败:${res && res.message}`);
    }

  }

  return (
    <div className={styles.main}>
      <div className={styles.userName}>
        <Input
          onChange={e => {
            setUsername(e.target.value)
          }}
          defaultValue={username}
          placeholder="请输入账号"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={
            <Tooltip title="请输入账号">
              <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </div>
      <div className={styles.password}>
        <Input.Password
          onChange={e => {
            setPassword(e.target.value)
          }}
          defaultValue={password}
          placeholder="请输入密码"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </div>
      <div className={styles.submit}>
        <Button
          onClick={handleSubmit}
          type="primary"
          block
          size="large"
          loading={loading}
        >
          登录
        </Button>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
