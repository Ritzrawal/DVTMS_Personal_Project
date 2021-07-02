import { useState } from 'react';
import { Menu, Layout } from 'antd';

import Navigation from './Navigation';

import './style.scss';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
      onCollapse={onCollapse}
    >
      <div className="logo">DVTMS</div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Navigation />
      </Menu>
    </Sider>
  );
};

export default Sidebar;
