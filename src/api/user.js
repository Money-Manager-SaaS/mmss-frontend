import { _get, _post } from './index';
import { getCategories } from './category';
import { getAccounts } from './account';

export const getUser = (data) => {
  let req = {
    data,
    url: '/api/v1/user',
  };
  return _get(req);
};

export const userRegister = (data) => {
  let req = {
    data,
    url: `/api/v1/register`,
  };
  return _post(req);
};

export const userLogin = (data) => {
  let req = {
    data,
    url: `/api/v1/login`,
  };
  return _post(req);
};

export const userLogout = (data) => {
  let req = {
    data,
    url: `/api/v1/logout`,
  };
  return _post(req);
};

const mockPayees = [
  { id: 1, name: 'Tester1' },
  { id: 2, name: 'Tester2' },
];

export const mockGetUser = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getAccounts(), getCategories()]).then(([accountsData, categoriesData]) => {
      const data = {
        data: {
          accounts: accountsData.data.accounts,
          categories: categoriesData.data.categories,
          email: '39260972@qq.com',
          payees: mockPayees,
        },
        status: 200,
        message: 'Get User Successfully',
      };

      const failedData = {
        status: 401,
        message: 'Get User Failed',
      };

      resolve(data);
    });
  });
};
