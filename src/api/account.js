import { _post, _get, _delete, _put } from './index';

export const getAccounts = (data) => {
  let req = {
    data,
    url: 'api/v1/accounts',
  };
  return _get(req);
};

export const createAccount = (data) => {
  let req = {
    data,
    url: `api/v1/accounts/${data.ledgerId}`,
  };
  return _post(req);
};

export const updateAccount = (data) => {
  let req = {
    data,
    url: `api/v1/accounts/${data.ledgerId}/${data.id}`,
  };
  return _put(req);
};

export const deleteAccount = (data) => {
  let req = {
    url: `api/v1/accounts/${data.ledgerId}/${data.id}`,
  };
  return _delete(req);
};
