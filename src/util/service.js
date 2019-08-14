import axios from 'axios'
import qs from "qs"
import store from '../store';
import { Message } from 'iview';
import router from '@/router'

// axios相应的封装
const service = axios.create({
    timeout: 5000,
    baseURL: "http://localhost:8099"
});


service.interceptors.request.use(
    config => {
        const token = store.getters.getToken ? store.getters.getToken : localStorage.getItem('token');

        if (token) {
            config.headers["Authentication"] = token
        }
        if (config.method === 'post' || config.method === 'put') {
            // config.data = qs.stringify({...config.data });
            config.headers['Content-Type'] = 'application/json; charset=utf-8';
            config.data = JSON.stringify({...config.data })

        } else if (config.method === 'get') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            config.params = {...config.params }
        }


        return config;
    }, error => {

        return Promise.reject(error);
    }

)

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {

        const errorData = error.response.data ? error.response.data : null;
        if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
            Message.error("网络连接超时");
            //return Promise.reject(error); // reject这个错误信息
        } else if (errorData.status === 401) {
            console.log(this.$route);
            Message.error("您还未登陆，请先登录");
            router.push({ name: 'Login' });
        } else if (errorData.message) {
            Message.warning(errorData.message);
        } else {
            Message.error("服务异常！");

        }
        return Promise.reject(error);
    }
);

export default service