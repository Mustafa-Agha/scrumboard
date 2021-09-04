import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Form, Input, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

// CONTEXTS
import { useStore } from 'contexts';

// FIREBASE
import FirebaseService from 'services/FirebaseService';
import Utils from 'utils';

const initialCredential = {
  email: 'user@devhub.net',
  password: 'admin123@!',
};

const LoginForm: FC = () => {
  const history = useHistory();
  const { mainStore } = useStore();
  const { setSharedLoading, sharedLoading } = mainStore;

  const onLogin = async (values: any) => {
    try {
      setSharedLoading(true);
      const response: any = await FirebaseService.signInEmailRequest(values);
      const { status, data, msg } = response;

      if (status === 'success') {
        Utils.setLocalStorage('AUTH_TOKEN', data.uid);
        setSharedLoading(false);
        history.push('/');
      } else {
        notification.error({ message: msg });
        setSharedLoading(false);
      }
    } catch (err: any) {
      notification.error({ message: err.message || err });
      setSharedLoading(false);
    }
  };

  return (
    <>
      <Form
        className="form"
        layout="vertical"
        name="login"
        initialValues={initialCredential}
        onFinish={onLogin}>
        <Form.Item
          className="form__item"
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
            {
              type: 'email',
              message: 'Please enter a validate email!',
            },
          ]}>
          <Input
            size="large"
            placeholder="user@example.com"
            className="text-primary"
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}>
          <Input.Password
            size="large"
            placeholder="password"
            prefix={<LockOutlined className="text-primary" />}
          />
        </Form.Item>

        <Form.Item className="form__item">
          <Button
            className="primary"
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={sharedLoading}>
            LOG IN
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default observer(LoginForm);
