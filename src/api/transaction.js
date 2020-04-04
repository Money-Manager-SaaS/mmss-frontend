import { _get, _post, _delete, _put } from './index';

export const getTransactions = (data) => {
  let req = {
    data,
    url: 'api/v1/transactions',
  };
  return _get(req);
};

export const getOneTransaction = (data) => {
  let req = {
    data,
    url: `api/v1/transactions/${data.id}`,
  };
  return _get(req);
};

export const createTransaction = (data) => {
  let req = {
    data,
    url: 'api/v1/transactions',
  };
  return _post(req);
};

export const updateTransaction = (data) => {
  let req = {
    data,
    url: `api/v1/transactions/${data.id}`,
  };
  return _put(req);
};

export const deleteTransaction = (data) => {
  let req = {
    url: `api/v1/transactions/${data.id}`,
  };
  return _delete(req);
};
