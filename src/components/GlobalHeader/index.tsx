import React from 'react';
import { Layout, Icon, Menu, Dropdown, Avatar } from "antd";
import styles from "./index.module.less";

interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: any;
  currentUser?:any;
}

const GlobalHeader = ({
  collapsed,
  onCollapse,
  currentUser ={}
}: GlobalHeaderProps) => {
  const onClick = ({key}:any) => {
    console.log("key", key);
  }
  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onClick}>
      <Menu.Item key="setting">
        <Icon type="setting" />
        账号设置
      </Menu.Item>
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );


  return (
    <Layout.Header style={{ background: "#fff", padding: 0 }}>
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
