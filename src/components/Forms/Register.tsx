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

const RegisterForm: FC = () => {
  const history = useHistory();
  const { mainStore } = useStore();
  const { setSharedLoading, sharedLoading } = mainStore;

  const onRegister = async (values: any) => {
    try {
      try {
        setSharedLoading(true);
        const response: any = await FirebaseService.signUpEmailRequest(values);
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
    } catch (err) {
      console.log('Validate Failed:', err);
    }
  };

  return (
    <>
      <Form
        className="form"
        layout="vertical"
        name="register"
        onFinish={onRegister}>
        <Form.Item
          className="form__item"
          name="email"
          label="Email"
          hasFeedback
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
          hasFeedback
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

        <Form.Item
          className="form__item"
          name="confirm"
          label="Confirm Password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords do not match!');
              },
            }),
          ]}>
          <Input.Password
            size="large"
            placeholder="confirm password"
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
            REGISTER
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default observer(RegisterForm);
