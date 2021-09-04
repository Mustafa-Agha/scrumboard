import { FC } from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content, Footer } = Layout;

const MainLayout: FC = ({ children }) => {
  return (
    <Layout className="layout">
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Scrumboard ©{new Date().getFullYear()} Created by DevHub
      </Footer>
    </Layout>
  );
};

export default MainLayout;
