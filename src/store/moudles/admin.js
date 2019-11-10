import adminApi from '@/api/admin'
import { getToken, setToken, removeToken } from '@/util/auth'


const state = {
    account: '',
    password: '',
    token: getToken(),


}

// const getters = {
//     getToken: state => state.token,
//     getAccount: state => state.account,

// }

const mutations = {
    SET_TOKEN: (state, token) => {
        setToken(token);
        state.token = token
    },

}

const actions = {
    login({ commit }, { username, password }) {
        let that = this;
        return new Promise((resolve, reject) => {
            adminApi.login(username, password)
                .then(response => {
                    const data = response.data;
                    const token = data.token;
                    const roles = data.user.roles;
                    // console.log(roles);


                    commit('SET_TOKEN', token);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    changePassword({ commit }, { opassword, password }) {
        return new Promise((resolve, reject) => {
            adminApi.changePassword(opassword, password).then(response => {
                const msg = response.message;
                resolve(msg);
            }).catch(error => {
                reject(error);
            })
        })
    },
    register(commit, userInfo) {
        return new Promise((resolve, reject) => {
            console.log(userInfo);
            adminApi.register(userInfo).then(response => {
                const msg = response.message;
                resolve(msg);
            }).catch(error => {
                reject(error);
            })
        })
    },
    logout({ commit }) {

        removeToken();
        commit("SET_TOKEN", '');

        // return new Promise((resolve, reject) => {
        //     userApi.logout().then(response => {
        //         localStorage.removeItem("token");
        //         commit("SET_TOKEN", null);
        //         resolve(reject);
        //     }).catch(error => {
        //         reject(error);
        //     })
        // })
    }
}


export default { state, mutations, actions };