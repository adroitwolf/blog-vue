import userApi from '@/api/user'
import adminApi from '@/api/admin'
import { getToken, setToken, removeToken } from '@/util/auth'
const state = {
    nickname: '',
    avatar: '',
    aboutMe: '',
    roles: [],
    token: null
};



const mutations = {
    SET_PROFILE: (state, profile) => {
        state.nickname = profile.nickname;
        state.avatar = profile.avatar;
        state.aboutMe = profile.aboutMe;
        state.roles = profile.roles;
    },
    UPDATE_PROFILE: (state, profile) => {
        state.nickname = profile.nickname;
        state.aboutMe = profile.aboutMe;
    },
    UPDATE_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_TOKEN: (state, token) => {
        setToken(token);
        state.token = token;
    },
    CLEAR_PROFILE: (state) => {
        state.nickname = "";
        state.avatar = "";
        state.aboutMe = "";
        state.roles = [];
    }
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
        //     return new Promise((resolve, reject) => {
        //         let autoToken = {};
        //         autoToken.accessToken = state.accessToken;
        //         autoToken.refreshToken = state.refreshToken;
        //         adminApi.logout(autoToken).then(response => {
        //             this.clear_Info();
        //         }).catch(error => {
        //             reject(error);
        //         })
        //     })
        // },
        // clear_Info({ commit }) {
        removeToken(); //删除cookie
        //清除用户信息
        commit("SET_TOKEN", '');
        commit("CLEAR_PROFILE");
    },
    refreshToken({ commit }, refreshToken) { //刷新token,并且只能被service.js调用
        console.log(refreshToken);
        return new Promise((resolve, reject) => {
            adminApi.refresh(refreshToken).then(response => {
                let data = response.data;
                let token = data.data ? data.data : null;
                commit('SET_TOKEN', token);
                resolve(data);
            }).catch(error => {
                alert(JSON.stringify(error));
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
    updateProfile({ commit }, { nickname, aboutMe }) {
        return new Promise((resolve, reject) => {
            userApi.updateProfile(nickname, aboutMe).then(response => {
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
    },
    verCode({ commit }, email) {
        return new Promise((resolve, reject) => {
            adminApi.verCode(email);
            resolve("发送成功");
        })
    }

};

export default { state, mutations, actions };