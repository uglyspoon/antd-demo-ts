import React from 'react';
import { Layout, Icon } from 'antd';
import './index.less'

interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: any;
}

const GlobalHeader = ({collapsed, onCollapse}: GlobalHeaderProps) => {

  return (
    <Layout.Header style={{ background: '#fff', padding: 0}}>
      <span className="trigger" onClick={onCollapse}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>

    </Layout.Header>
  )
}

export default GlobalHeader;
