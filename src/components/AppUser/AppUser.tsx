import { Avatar, Menu, Dropdown } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';

import config from '../../config';
import styles from './AppUser.module.scss';
import { removeToken } from '../../utils/token';

const AppUser = () => {
  const handleLogout = () => {
    removeToken({ name: config.tokenName });
    window.location.href = '/';
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={handleLogout}>Logout</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles['app-user']}>
      <Dropdown overlay={menu} placement="bottomRight">
        <div>
          <Avatar size={38} />
          <CaretDownFilled
            style={{ color: '#9EA0A5', marginLeft: '8px' }}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default AppUser;
