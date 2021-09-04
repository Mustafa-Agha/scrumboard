import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Card } from 'antd';

import { useStore } from 'contexts';

import LoginForm from 'components/Forms/Login';

const Login: FC = () => {
  const { mainStore } = useStore();
  const { theme } = mainStore;

  const logo = theme === 'dark' ? 'logo-white.png' : 'logo.png';

  return (
    <div className="form__wrapper">
      <Card className="form__card">
        <div className="form__card__wrapper">
          <div className="img__wrapper text-center">
            <img
              className="card__img"
              src={`/assets/images/${logo}`}
              alt="logo"
            />
          </div>
          <p className="form__redirect-text text-center">
            Don't have an account yet? <a href="/auth/register">Sign Up</a>
          </p>
          <Row justify="center">
            <Col xs={24} sm={24} md={20} lg={20}>
              <LoginForm />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default observer(Login);
