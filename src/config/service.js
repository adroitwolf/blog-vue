import axios from 'axios'
import { getToken } from '@/util/auth'
import qs from "qs"
import store from '@/store'
import { Message } from 'view-design'
import router from '@/router'
import { BASE_URL } from '@/config/global.var'


// axios相应的封装
const service = axios.create({
    timeout: 5000,
    baseURL: BASE_URL
});


service.interceptors.request.use(
    config => {
        const token = store.getters.token ? store.getters.token : getToken();
        console.log(store.getters.token);
        if (token) {
            config.headers["Authentication"] = token
        }
        if (config.method === 'post' || config.method === 'put') {
            // config.data = qs.stringify({...config.data });
            if (config.headers['Content-Type'] === 'multipart/form-data') {

            } else {
                config.headers['Content-Type'] = 'application/json; charset=utf-8';
                config.data = JSON.stringify({...config.data })
            }

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
        const res = response;
        console.log(res);
        const data = res ? res.data : null;
        const status = data ? data.status : -1;
        if (status === 200) {
            return data;
        }
        if (status === 401 || status === 403) { // 验证当前地址 消除缓存 如果当前的是主页的登陆，则不退到登陆窗口

            store.dispatch("logout");
            let href = window.location.href;
            let post = window.location.port;
            let url = href.split(post + "/");
            console.log(url[1]);

            var re = /^index.html.*?/;

            if (re.test(url[1])) {
                return response;
            } else {
                Message.error("您还未登陆，请先登录");
                router.push({ name: 'Login' });
            }
            Message.error(data.message);
        } else if (status === 400) {
            Message.warning(data.message);
        } else if (status === 500) {
            Message.error("服务异常！");
        } else if (status === 404) { //资源错误

        }
        return Promise.reject(response);
    },
    error => {
        console.log(error.response)
        const res = error.response
        const status = res ? res.status : -1;
        const data = res ? res.data : null;
        if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
            Message.error("网络连接超时");

            //return Promise.reject(error); // reject这个错误信息
        }
        return Promise.reject(error);
    }
);

export default service