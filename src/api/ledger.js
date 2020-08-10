import { _post, _get, _delete, _put } from './index';

export const getLedgers = (data) => {
  let req = {
    data,
    url: 'api/v1/ledgers',
  };
  return _get(req);
};

export const ledgerInit = (id) => {
  let req = {
    url: `api/v1/init/${id}`,
  };
  return _get(req);
};

export const getOneLedger = (data) => {
  let req = {
    data,
    url: `api/v1/ledgers/${data.id}`,
  };
  return _get(req);
};

export const createLedger = (data) => {
  let req = {
    data,
    url: 'api/v1/ledgers',
  };
  return _post(req);
};

/**
 * post an empty body to either get a default ledger or create one
 */
export const createDefaultLedger = () => {
  let req = {
    data: undefined,
    url: 'api/v1/ledgers/default',
  };
  return _post(req);
};

export const updateLedger = (data) => {
  let req = {
    data,
    url: `api/v1/ledgers/${data.id}`,
  };
  return _put(req);
};

export const deleteLedger = (data) => {
  let req = {
    url: `api/v1/ledgers/${data.id}`,
  };
  return _delete(req);
};
