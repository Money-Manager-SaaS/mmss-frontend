import { _get, _post } from './index';
import { getCategories } from './category';
import { getAccounts } from './account';
import { getPayees } from './payee';

export const getUser = (data) => {
  let req = {
    data,
    url: 'api/v1/user',
  };
  return _get(req);
};

export const userRegister = (data) => {
  let req = {
    data,
    url: `api/v1/register`,
  };
  return _post(req);
};

export const userLogin = (data) => {
  let req = {
    data,
    url: `api/v1/login`,
  };
  return _post(req);
};

export const userLogout = (data) => {
  let req = {
    data,
    url: `api/v1/logout`,
  };
  return _post(req);
};

export const mockGetUser = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getAccounts(), getCategories(), getPayees()]).then(
      ([accountsData, categoriesData, payeesData, ledgerData]) => {
        let data;
        if (accountsData.status === 401 || categoriesData.status === 401) {
          data = {
            status: 401,
            message: 'Get User Failed',
          };
        } else {
          data = {
            data: {
              accounts: accountsData.data.accounts,
              categories: categoriesData.data.categories,
              email: '39260972@qq.com',
              payees: payeesData.data.payees,
            },
            status: 200,
            message: 'Get User Successfully',
          };
        }

        resolve(data);
      }
    );
  });
};
