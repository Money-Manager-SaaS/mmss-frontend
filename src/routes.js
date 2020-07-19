import { Overall, Profile, Login, Register, Setting } from './views';
import React from 'react';
import { BookOutlined, UserOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons';
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
    name: 'Transactions',
    component: AuthHOC(Overall),
    icon: <BookOutlined />,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: null,
    icon: <LineChartOutlined />,
  },
  {
    path: '/settings',
    name: 'Setting',
    component: Setting,
    icon: <SettingOutlined />,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: AuthHOC(Profile),
    icon: <UserOutlined />,
  },
  // {
  //   path: '/accounts',
  //   name: 'Accounts',
  //   component: AuthHOC(Account),
  //   icon: <AccountBookOutlined />,
  // },
  // {
  //   path: '/categories',
  //   name: 'Categories',
  //   component: AuthHOC(Category),
  //   icon: <PicRightOutlined />,
  // },
  // {
  //   path: '/payees',
  //   name: 'Payees',
  //   component: AuthHOC(Payee),
  //   icon: <UsergroupAddOutlined />,
  // },
];

export default routes;
