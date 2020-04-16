import { Overall, Profile } from './views';
import React from 'react';
import {
  PicRightOutlined,
  AccountBookOutlined,
  BookOutlined,
  UsergroupAddOutlined,
  SmileOutlined,
} from '@ant-design/icons';
const routes = [
  {
    path: '/',
    name: 'Overall',
    component: Overall,
    icon: <BookOutlined />,
  },
  {
    path: '/login',
    component: null,
  },
  {
    path: '/register',
    component: null,
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: null,
    icon: <AccountBookOutlined />,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: null,
    icon: <PicRightOutlined />,
  },
  {
    path: '/payees',
    name: 'Payees',
    component: null,
    icon: <UsergroupAddOutlined />,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    icon: <SmileOutlined />,
  },
];

export default routes;
