import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Product from './pages/Product';
import Payment from './pages/Payment';
import Edit from './pages/Edit';
import SideNav from './components/Sidebar';
import { Layout } from 'antd';

const LayoutWrapper = styled(Layout)`
  height: 100vh;
  width: 100%;
  @media (max-width: 768px) {
    display: block;
    padding: 20px;
  }
`;

const App: React.FC = () => {
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
  }, []);

  return (
    <Router>
      <LayoutWrapper>
        <Layout.Sider
          collapsible
          trigger={null}
          collapsed={collapse}
          style={{
            overflow: 'auto',
            height: '100vh',
            width: '200px',
            position: 'fixed',
            left: 0,
          }}
        >
          <SideNav />
        </Layout.Sider>
        <Layout>
          <Layout.Content
            style={{
              margin: '24px 16px 24px 220px',
              padding: 24,
              background: '#fff',
            }}
          >
            <Switch>
              <Route path='/product' component={Product} />
              <Route path='/payment' component={Payment} />
              <Route path='/edit' component={Edit} />
              <Redirect from='/' to='/product' />
            </Switch>
          </Layout.Content>
        </Layout>
      </LayoutWrapper>
    </Router>
  );
};

export default App;
