import { Form, Input, Button, notification} from "antd";

import { useHistory } from "react-router-dom";

import Auth from "../../services/Auth";

import "./styles.scss";

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ResetPassword = () => {

  let history = useHistory();

  const onFinish = (values: any) => {
    const args = {
      token: history.location.pathname.slice(19),
      data: values,
    };
    Auth.passwordReset(args).then((resp: any) => {
      if (resp.status === 200 || resp.status===201) {
        history.push("/login");
        openNotificationWithIcon()
      }
    }).catch(()=>{
      onPasswordResetFail();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const openNotificationWithIcon = () => {
    notification.success({
      message: 'Password Reset Successfull!',
      description:
        'Please login with new password.',
    });
  };

  const onPasswordResetFail= () => {
    notification.error({
      message: "Can't reset Password!",
      description:
        'Please re-try Again',
    });
  };
  
  return (
    <div className="wrapper">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[{ required: true, message: "Please enter New Password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          rules={[
            { required: true, message: "Please re-enter Password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
