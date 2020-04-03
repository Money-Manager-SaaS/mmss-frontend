import { Overall, Profile } from './views';

const routes = [
  {
    path: '/',
    name: 'Overall',
    component: Overall,
  },
  {
    path: '/login',
    name: 'Sign in',
    component: null,
  },
  {
    path: '/register',
    name: 'Sign up',
    component: null,
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: null,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: null,
  },
  {
    path: '/payees',
    name: 'Payees',
    component: null,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

export default routes;
