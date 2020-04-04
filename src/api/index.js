const baseURL = 'https://mm-cloud.herokuapp.com/';

const axios = require('axios').create({
  baseURL: baseURL, //api请求的baseURL
  timeout: 10000,
  withCredentials: true, // 允许跨域 cookie
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  maxContentLength: 2000,
  transformResponse: function (data) {
    try {
      data = JSON.parse(data);
      // console.log(data);
      if (data.status === 401) {
        window.location.reload();
      }
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
