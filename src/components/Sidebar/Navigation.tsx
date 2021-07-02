import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';

import config from '../../config';
import routes from '../../config/routes';

const dashboard = {
  name: 'Dashboard',
  icon: <PieChartOutlined />,
  route: routes.dashboard.path,
};

const vehicleEntry = {
  name: 'Vehicle Entries',
  icon: <PieChartOutlined />,
  route: routes.vehicleEntry.path,
};

const naamSari = {
  name: 'Naam Sari',
  icon: <PieChartOutlined />,
  route: routes.naamSari.path,
};

const verifiedList = {
  name: 'Verified List',
  icon: <PieChartOutlined />,
  route: routes.verifiedList.path,
};

const unverfiedList = {
  name: 'Unverified List',
  icon: <PieChartOutlined />,
  route: routes.unverifiedList.path,
};

const unverfiableList = {
  name: 'Unverifiable List',
  icon: <PieChartOutlined />,
  route: routes.unverfiableList.path,
};

const analytics = {
  name: 'Analytics',
  icon: <PieChartOutlined />,
  route: routes.analytics.path,
};

const users = {
  name: 'Users',
  icon: <PieChartOutlined />,
  route: routes.users.path,
};

const systemAdmin = [
  dashboard,
  vehicleEntry,
  verifiedList,
  unverfiedList,
  users,
  analytics,
  naamSari,
];

const companyUser = [dashboard, vehicleEntry];

const companyAdmin = [
  dashboard,
  vehicleEntry,
  verifiedList,
  unverfiedList,
  unverfiableList,
  users,
  analytics,
  naamSari,
];

const bhansarAgent = [dashboard, vehicleEntry];

const showroomAdmin = [dashboard, vehicleEntry, verifiedList];

const navigationObj = {
  [config.roles.SystemAdmin]: systemAdmin,
  [config.roles.CompanyAdmin]: companyAdmin,
  [config.roles.CompanyUser]: companyUser,
  [config.roles.BhansarAgent]: bhansarAgent,
  [config.roles.ShowroomAdmin]: showroomAdmin,
};

const Navigation = () => {
  const location = useLocation();

  const { loggedInUser = [] } = useSelector(
    (state: any) => state.auth,
  );

  let group = loggedInUser?.groups[0];

  let menus = [];
  if (!navigationObj[group]) {
    menus = navigationObj[config.roles.CompanyAdmin];
  } else {
    menus = navigationObj[group];
  }

  const selectedKeyIndex = menus.findIndex(
    (menu) => menu.route === location.pathname,
  );
  const selectedKey = [
    `${selectedKeyIndex <= -1 ? null : selectedKeyIndex}`,
  ];

  let menuEle = menus.map((menu, key) => {
    return (
      <Menu.Item key={key}>
        <Link to={menu.route}>{menu.name}</Link>
      </Menu.Item>
    );
  });

  return (
    <Menu theme="dark" selectedKeys={selectedKey} mode="inline">
      {menuEle}
    </Menu>
  );
};

export default Navigation;
