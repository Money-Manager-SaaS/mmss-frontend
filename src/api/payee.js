import { _post, _get, _delete, _put } from './index';

export const getPayees = (data) => {
  let req = {
    data,
    url: 'api/v1/payees',
  };
  return _get(req);
};

export const getOnePayee = (data) => {
  let req = {
    data,
    url: `api/v1/payees/${data.id}`,
  };
  return _get(req);
};

export const createPayee = (data) => {
  let req = {
    data,
    url: 'api/v1/payees',
  };
  return _post(req);
};

export const updatePayee = (data) => {
  let req = {
    data,
    url: `api/v1/payees/${data.id}`,
  };
  return _put(req);
};

export const deletePayee = (data) => {
  let req = {
    url: `api/v1/payees/${data.id}`,
  };
  return _delete(req);
};
