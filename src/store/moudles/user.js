import userApi from '@/api/user'
import { BASE_URL } from '@/config/global.var'
const state = {
    username: '',
    avatarId: '',
    phone: '',
    email: '',
    aboutMe: '',
    roles: [],
};



const mutations = {


    SET_PROFILE: (state, profile) => {
        state.username = profile.username;
        var re = /^[ ]*$/;
        if (profile.avatar != null && !re.test(profile.avatar)) {
            state.avatarId = BASE_URL + "/" + profile.avatar;
        }
        state.phone = profile.phone;
        state.email = profile.email;
        state.aboutMe = profile.aboutMe;
        state.roles = profile.roles;
    },
    UPDATE_PROFILE: (state, profile) => {
        state.username = profile.username;
        var re = /^[ ]*$/;
        if (profile.avatar != null && !re.test(profile.avatar)) {
            state.avatarId = BASE_URL + "/" + profile.avatar;
        }

        state.phone = profile.phone;
        state.email = profile.email;
        state.aboutMe = profile.aboutMe;
    },
    UPDATE_AVATAR: (state, avatar) => {
        var re = /^[ ]*$/;
        if (avatar != null && !re.test(avatar)) {
            state.avatarId = BASE_URL + "/" + avatar;
        }
    }
};

const actions = {

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
        if (!username) {
            username = state.username;
        }
        if (!phone) {
            phone = state.phone
        }
        if (!email) {
            email = state.email
        }

        if (!aboutMe) {
            aboutMe = state.aboutMe
        }


        return new Promise((resolve, reject) => {
            userApi.updateProfile(username, phone, email, aboutMe).then(response => {
                const data = response.data;
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