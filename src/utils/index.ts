import { message } from 'antd';

message.config({
  top: 100,
  duration: 2,
  maxCount: 1
});

export const isSuccess = (res: any):boolean => {
  if (res) {
    if (res.status === 200) {
      return true;
    } else {
      message.error(message.error(res.message));
    }
  } else {
    message.error('请求错误～');
  }
  return false;
}

