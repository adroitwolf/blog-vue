import axios from 'axios'
import { getToken } from '@/util/auth'
import qs from "qs"
import store from '@/store'
import { Message } from 'view-design'
import router from '@/router'
import { BASE_URL } from '@/config/global.var'


// axios相应的封装
const service = axios.create({
    timeout: 10000,
    baseURL: BASE_URL

});


function setTokenToHeader(config) {
    // set token
    const token = store.getters.token ? store.getters.token : getToken();
    if (token && token.access_token) {
        config.headers['Authentication'] = token.access_token;
    }
}


// 是否正在刷新的标记
let isRefreshing = false
    // 重试队列，每一项将是一个待执行的函数形式
let requests = []

//重试请求
function reRequest(config) {
    setTokenToHeader(config);

    return axios.request(config).then(response => response.data);

}


function refreshToken(res) {

    const refreshToken = store.getters.token ? store.getters.token.refresh_token : getToken() ? getToken().refresh_token : null;
    return new Promise((resolve, reject) => {
        store.dispatch("refreshToken", refreshToken).then(response => {
            if (response && response.status === 401) { //这时候说明需要重新登陆了

                Message.error("登陆凭证失效，请重新登录");
                router.push({ name: 'Login' });
            } else { //正常情况下刷新成功
                requests.forEach(cb => cb(1));
                requests = [];
                // return reRequest(res.config).then(data => data);
                reRequest(res.config).then(data => {
                    console.log(data);
                    resolve(data);
                })
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => { //重置flag
            isRefreshing = false;
            requests = [];
        });
    });

}

service.interceptors.request.use(
    config => {
        setTokenToHeader(config);
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
        const config = response.config

        const data = res ? res.data : null;
        const status = data ? data.status : -1;
        if (status === 200) {
            console.log("成功");
            return data;
        }
        if (status === 401) { // 验证当前地址 消除缓存 如果当前的是主页的登陆，则不退到登陆窗口
            if (store.getters.token && store.getters.token.access_token === data.data) { //先查看是否有token
                if (!isRefreshing) { //判断当前是否有请求在刷新
                    isRefreshing = true;
                    return refreshToken(response).then(res => res);
                } else { // 正在刷新token，将返回一个未执行resolve的promise
                    return new Promise((resolve) => {
                        requests.push((flag) => {
                            resolve(reRequest(config));
                            // reRequest(config);
                        })
                    });
                    // const res = refreshToken(error);
                    // if (res !== error) {
                    //     return res;
                    // }
                }
            } else {
                store.dispatch("clear_info");
                let href = window.location.href;
                let post = window.location.port;
                let url = href.split(post + "/");

                var re = /^index.html.*?/;

                if (re.test(url[1])) {
                    return response;
                } else {
                    Message.error("您还未登陆，请先登录");
                    router.push({ name: 'Login' });
                }
                Message.error(data.message);
            }


        } else if (status === 400 || status === 503) {
            Message.error(data.message);
        } else if (status === 500) {
            Message.error("服务异常！");
        } else if (status === 404) { //资源错误

        } else if (status === 403) {
            Message.error("请不要尝试权限之外的事情");
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
