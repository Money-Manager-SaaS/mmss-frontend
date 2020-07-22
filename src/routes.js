import React from 'react';
import { BookOutlined, UserOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons';
import AuthHOC from './components/AuthHOC';

import Overall from './views/overall';
import Profile from './views/profile';
import Login from './views/auth/SignIn';
import Register from './views/auth/SignUp';
import Setting from './views/setting';
import Ledger from './views/ledger';
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
    path: '/ledger',
    name: 'Ledger',
    component: AuthHOC(Ledger),
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
];

export default routes;
