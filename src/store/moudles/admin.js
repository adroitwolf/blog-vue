import adminApi from '@/api/admin'

const state = {
    account: '',
    password: '',
    token: null,
}

const getters = {
    getToken: state => state.token,
    getAccount: state => state.account,

}

const mutations = {
    setToken: (state, token) => {
        state.token = token
    },

}

const actions = {
    login({ commit }, { username, password }) {
        return new Promise((resolve, reject) => {
            adminApi.login(username, password)
                .then(response => {
                    const token = response.data;
                    console.log(token);
                    localStorage.setItem('token', token);
                    commit('setToken', token);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    changePassword({ commit }, { opassword, password }) {
        return new Promise((resolve, reject) => {
            userApi.changePassword(opassword, password).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    logout({ commit }) {

        localStorage.removeItem("token");
        commit("setToken", null);

        // return new Promise((resolve, reject) => {
        //     userApi.logout().then(response => {
        //         localStorage.removeItem("token");
        //         commit("setToken", null);
        //         resolve(reject);
        //     }).catch(error => {
        //         reject(error);
        //     })
        // })


    }
}


export default { state, getters, mutations, actions };