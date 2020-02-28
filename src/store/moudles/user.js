import userApi from '@/api/user'
import adminApi from '@/api/admin'
import { getToken, setToken, removeToken } from '@/util/auth'
const state = {
    nickname: '',
    avatar: '',
    phone: '',
    email: '',
    aboutMe: '',
    roles: [],
    username: '',
    password: '',
    token: null
};



const mutations = {
    SET_PROFILE: (state, profile) => {
        state.nickname = profile.nickname;
        state.avatar = profile.avatar;
        state.phone = profile.phone;
        state.email = profile.email;
        state.aboutMe = profile.aboutMe;
        state.roles = profile.roles;
    },
    UPDATE_PROFILE: (state, profile) => {
        state.nickname = profile.nickname;
        state.phone = profile.phone;
        state.email = profile.email;
        state.aboutMe = profile.aboutMe;
    },
    UPDATE_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_TOKEN: (state, token) => {
        setToken(token);
        state.token = token
    },
};

const actions = {
    login({ commit }, { username, password }) {
        return new Promise((resolve, reject) => {
            adminApi.login(username, password)
                .then(response => {
                    const token = response.data;
                    // const token = data.token;
                    // const roles = data.user.roles;
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

        removeToken(); //删除cookie
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
    },
    refreshToken({ commit }, refreshToken) { //刷新token
        return new Promise((resolve, reject) => {
            adminApi.refresh(refreshToken).then(response => {
                    const token = response.data;
                    // const token = data.token;
                    // const roles = data.user.roles;
                    // console.log(roles);
                    commit('SET_TOKEN', token);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        })
    },
    getProfile({ commit }) {
        return new Promise((resolve, reject) => {
            userApi.getProfile().then(response => {
                const data = response.data;
                commit('SET_PROFILE', data);
                resolve(data)
            }).catch(error => {
                reject(error);
            })
        })
    },
    updateProfile({ commit }, { username, phone, email, aboutMe }) {
        // if (!username) {
        //     username = state.username;
        // }
        // if (!phone) {
        //     phone = state.phone
        // }
        // if (!email) {
        //     email = state.email
        // }

        // if (!aboutMe) {
        //     aboutMe = state.aboutMe
        // }
        return new Promise((resolve, reject) => {
            userApi.updateProfile(username, phone, email, aboutMe).then(response => {
                const data = response.data;
                console.log(data);
                commit("UPDATE_PROFILE", data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    uploadAvatarId({ commit }, { file }) {
        return new Promise((resolve, reject) => {
            userApi.uploadAvatar(file).then(response => {
                const data = response.data;
                console.log(data);
                commit("UPDATE_AVATAR", data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

};

export default { state, mutations, actions };