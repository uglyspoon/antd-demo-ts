import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import { Cookies } from 'react-cookie';
import { notification } from 'antd';

const cookie = new Cookies();

axios.defaults.baseURL = 'http://47.99.138.248/admin';
axios.defaults.headers.common['Authorization'] = cookie.get('token');

axios.defaults.headers.post['Content-Type'] = 'application/json';

function getLocalToken() {
  const token = cookie.get("token");
  return token;
}

const handleError = (error:any) => {
  console.log('error.data', error.data)
  notification.error({
    message: '服务器出错啦～',
    description: `状态码:${error.status}| ${error.data.message}`
  })
  console.log('error.data', error.data)
  if (error.data && error.data.status === 40101) {
    window.location.replace('/user/login')
  }
}

const axiosInstance = axios.create({
  baseURL: "http://47.99.138.248/admin",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": getLocalToken() // headers塞token
  }
});


axiosInstance.interceptors.response.use(
  response => {
    // 接下来会在这里进行token过期的逻辑处理
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

const request = ({url ,data, method='post', ...rest }: AxiosRequestConfig) => {
  return axios({
    url,
    data,
    method,
    ...rest
  })
  .then(function (response:AxiosResponse) {
    // handle success
    return response;
  })
  .then(function (response:AxiosResponse) {
    if (response.status === 200) {
      return response.data;
    }
  })
  .catch(function (error:any) {
    // handle error
    handleError(error.response)
  })
  .finally(function () {
    // always executed
  });
}

export default request
