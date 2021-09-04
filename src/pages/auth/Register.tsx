import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Card } from 'antd';

import { useStore } from 'contexts';

import RegisterForm from 'components/Forms/Register';

const Register: FC = () => {
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
            Already have an account? <a href="/auth/login">LOG IN</a>
          </p>
          <Row style={{ padding: '10px' }} justify="center">
            <Col xs={24} sm={24} md={20} lg={20}>
              <RegisterForm />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default observer(Register);
