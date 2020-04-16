import { _get, _delete, _put } from './index';

export const getCategories = (data) => {
  let req = {
    data,
    url: '/api/v1/categories',
  };
  return _get(req);
};

export const getOneCategory = (data) => {
  let req = {
    data,
    url: `/api/v1/categories/${data.id}`,
  };
  return _get(req);
};

// export const createCategory = (data) => {
//   let req = {
//     data,
//     url: '/api/v1/categories',
//   };
//   return _post(req);
// };

export const updateCategory = (data) => {
  let req = {
    data,
    url: `/api/v1/categories/${data.id}`,
  };
  return _put(req);
};

export const deleteCategory = (data) => {
  let req = {
    url: `/api/v1/categories/${data.id}`,
  };
  return _delete(req);
};
