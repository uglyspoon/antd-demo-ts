import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
// import qs from 'qs';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

axios.defaults.baseURL = 'http://47.99.138.248/admin';
axios.defaults.headers.common['Authorization'] = cookie.get('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

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
  .catch(function (error:AxiosResponse) {
    // handle error
    console.log('from request.ts', error);
  })
  .finally(function () {
    // always executed
  });
}

export default request
