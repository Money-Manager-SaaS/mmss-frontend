const baseURL = 'https://mm-cloud.herokuapp.com/';

export const axios = require('axios').create({
  baseURL: baseURL, //api请求的baseURL
  timeout: 10000,
  withCredentials: true, // 允许跨域 cookie
  headers: { 'X-Requested-With': 'XMLHttpRequest' },

  transformResponse: function (data) {
    try {
      data = JSON.parse(data);
      // console.log(data);
    } catch (e) {
      data = {};
    }
    return data;
  },
});

// get
export const _get = (req) => {
  return axios.get(req.url, { params: req.data });
};

// post
export const _post = (req) => {
  return axios({ method: 'post', url: `/${req.url}`, data: req.data });
};

//update
export const _put = (req) => {
  return axios({ method: 'put', url: `/${req.url}`, data: req.data });
};

//delete
export const _delete = (req) => {
  return axios({ method: 'delete', url: `/${req.url}`, data: req.data });
};

export const refreshAccessToken = (data) => {
  let req = {
    data,
    url: `auth/refresh`,
  };
  return _post(req);
};
