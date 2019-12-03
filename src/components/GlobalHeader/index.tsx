import React from 'react';
import { Layout, Icon, Menu, Dropdown, Avatar, message } from "antd";
import styles from "./index.module.less";
import request from 'utils/request';
import { cookie } from 'utils/request';
import { isSuccess } from 'utils';
import { Link } from 'react-router-dom';


interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: any;
  currentUser?: any;
}

const GlobalHeader = ({
  collapsed,
  onCollapse,
  currentUser = {}
}: GlobalHeaderProps) => {
  const onClick = ({ key }: any) => {
    if (key === 'logout') {
      // request({url: "/igt/logout"})
      //   .then( data => {
      //     if (isSuccess(data)){
      //       cookie.remove('token')
      //     }
      //   })
      cookie.remove('token')
    } else if (key === 'setting') {
      message.info('暂未开放')
    }
  }
  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onClick}>
      <Menu.Item key="setting">
        <Icon type="setting" />
        账号设置
      </Menu.Item>
      <Menu.Item key="logout">
        <Link to="/user/login">
          <Icon type="logout" />
          退出登录
        </Link>
      </Menu.Item>
    </Menu>
  );


  return (
    <Layout.Header style={{ background: "#fff", padding: 0, boxShadow: '0 0 8px #d8d8d8' }}>
      <span className={styles.trigger} onClick={onCollapse}>
        <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
      </span>
      <div className={`${styles.right}`}>
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="default"
              className={styles.avatar}
              icon="user"
              alt="avatar"
            />
            <span className={styles.name}>{currentUser.name || 'admin'}</span>
          </span>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default GlobalHeader;
