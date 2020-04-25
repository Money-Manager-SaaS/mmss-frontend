import React from 'react';
import {
  PicRightOutlined,
  AccountBookOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Overall, Profile, Category, Payee, Account, Login, Register } from './views';
import AuthHOC from './components/AuthHOC';

export const loginRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
];
const routes = [
  {
    path: '/',
    name: 'Overall',
    component: AuthHOC(Overall),
    icon: <BookOutlined />,
  },

  {
    path: '/accounts',
    name: 'Accounts',
    component: AuthHOC(Account),
    icon: <AccountBookOutlined />,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: AuthHOC(Category),
    icon: <PicRightOutlined />,
  },
  {
    path: '/payees',
    name: 'Payees',
    component: AuthHOC(Payee),
    icon: <UsergroupAddOutlined />,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: AuthHOC(Profile),
    icon: <SmileOutlined />,
  },
];

export default routes;
