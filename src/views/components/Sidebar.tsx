import React from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import { Menu } from 'antd';
import {
  MoneyCollectOutlined,
  ShoppingCartOutlined,
  EditOutlined,
} from '@ant-design/icons';

const AppTitle = styled.div`
  height: 32px;
  margin: 36px 16px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

const MenuTitle = styled(Menu.Item)`
  padding: 36px 24px !important;
  span {
    font-size: 20px;
  }
`;

const SideNav: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const handleLinkToAction = (path: string) => {
    history.push(path);
  };

  return (
    <div>
      <AppTitle>Market-Sitter</AppTitle>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[location.pathname]}
      >
        <MenuTitle
          key='/product'
          onClick={() => {
            handleLinkToAction('/product');
          }}
        >
          <ShoppingCartOutlined style={{ fontSize: '24px' }} />
          <span> Product</span>
        </MenuTitle>
        <MenuTitle
          key='/payment'
          onClick={() => {
            handleLinkToAction('/payment');
          }}
        >
          <MoneyCollectOutlined style={{ fontSize: '24px' }} />
          <span> Payment</span>
        </MenuTitle>
        <MenuTitle
          key='/edit'
          onClick={() => {
            handleLinkToAction('/edit');
          }}
        >
          <EditOutlined style={{ fontSize: '24px' }} />
          <span> Edit</span>
        </MenuTitle>
      </Menu>
    </div>
  );
};

export default SideNav;
