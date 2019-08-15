import React, { useState } from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import styles from './BasicLayout.module.less';
import GlobalHeader from 'components/GlobalHeader';

import logo from 'assets/logo.svg';
import routes from 'routes';

const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;

export interface routeItemType {
  name?: string;
  path: string;
  redirect?: string;
  component?: string;
  icon?: string;
  routes?: Array<routeItemType>;
  hideInMenu?: boolean;
}

const rednerMenuItems = (routes: Array<routeItemType>) => {
  return routes.map(item => {
    if (item.routes && item.routes.some(i=>!i.hideInMenu)) {
      return <SubMenu
          key={item.path}
          title={
            <span>
              <Icon type={item.icon || 'smile'} />
              <span>{item.name}</span>
            </span>
          }
        >
        {rednerMenuItems(item.routes)}
      </SubMenu>
    } else if (item.redirect || item.hideInMenu) {
      return null
    } else {
      return <Menu.Item key={item.path}>
        <Icon type={item.icon || 'smile'} />
        <span>{item.name}</span>
        <Link to={item.path} />
      </Menu.Item>
    }
  })
}

const renderBreadcrumb = (routes: Array<routeItemType>) => {
  const { pathname } = window.location;
  const breadcrumbList:{path:string, name?: string}[] = [];
  routes.forEach(item => {
    if (item.path === pathname) {
      breadcrumbList.push({name: item.name, path: item.path})
    }
    if (item.routes && item.routes.length) {
      item.routes.forEach(el => {
        if (el.path === pathname) {
          breadcrumbList.push({name: item.name, path: item.path})
          breadcrumbList.push({name: el.name, path: el.path})
        }
      })
    }
  })
  return breadcrumbList.map(item => {
    return <Breadcrumb.Item key={item.path}>
      <span>{item.name}</span>
    </Breadcrumb.Item>
  })
}

const BaiscLayout: React.FC = ({ children }) => {
  const rootSubmenuKeys = ['/welcome', '/pmscore', '/setting'];
  const [collapsed, setCollasped] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(['']);
  const onCollapse = () => {
    setCollasped(!collapsed);
  }
  const onOpenChange = (keys:string[]) => {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys( keys );
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={256}
      >
        <div className={styles.logo} >
          <img src={logo} alt="" />
          <h1>智慧体测管理后台</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ padding: '16px 0px' }}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
        >
          {rednerMenuItems(routes)}
        </Menu>
      </Sider>
    <Layout>
      <GlobalHeader onCollapse={onCollapse} collapsed={collapsed}/>
        <Breadcrumb style={{ padding: '10px 0 0 15px' }}>
          <Breadcrumb.Item href="/">
            <Icon type="home" />
          </Breadcrumb.Item>
          {renderBreadcrumb(routes)}
        </Breadcrumb>
        <Content style={{ padding: 15 }}>
          {children}
        </Content>
      <Footer style={{ textAlign: 'center' }}>
          DaBai 2019 Created by Spoon
      </Footer>
      </Layout>
    </Layout>
  )
}

export default BaiscLayout;
