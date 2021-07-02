import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as authService from '../../redux/actions/auth';
import { resetRedirect } from '../../redux/actions/ui';

import { Form, Input, Button, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import logo from '../../assets/image/logo.png';
import styles from './style.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading = false, error } = useSelector(
    (state: any) => state.auth,
  );
  const { redirectLink } = useSelector((state: any) => state.ui);

  useEffect(() => {
    if (redirectLink) {
      history.push(redirectLink);
    }
  }, [history, redirectLink]);

  useEffect(() => {
    return function () {
      dispatch(resetRedirect());
    };
  }, [dispatch]);

  const handleSubmit = (values: any) => {
    dispatch(
      authService.login({
        username: values.username,
        password: values.password,
      }),
    );
  };

  let errorEle;
  if (error) {
    let errors = [];
    for (let key in error) {
      errors.push(...error[key]);
    }

    errorEle = <Alert message={errors} type="error" />;
  }

  return (
    <div className={styles['signin-page']}>
      <div className={styles['signin-page__banner']}>
        <div className={styles['signin-page__banner-bg']} />
        <img src={logo} alt="Logo Secondary Story Window" />
      </div>
      <div className={styles['signin-page__content']}>
        <h1>Sign In</h1>
        <Form onFinish={handleSubmit} className="login-form">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <div className="input-label">
              <label htmlFor="username">Email</label>
              <Input
                id="username"
                size="large"
                placeholder="Username"
              />
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <div className="input-label">
              <label htmlFor="password">Password</label>
              <Input.Password
                type="password"
                id="password"
                size="large"
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </Form.Item>

          {!!errorEle && errorEle}

          <Form.Item style={{ paddingTop: '1em' }}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles['login-form-button']}
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
