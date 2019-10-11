import userApi from '@/api/user'
import Global from '@/util/Global'
const state = {
    username: '',
    avatarId: '',
    phone: '',
    email: '',
    aboutMe: ''
};



const mutations = {


    SET_PROFILE: (state, profile) => {
        state.username = profile.username;
        var re = /^[ ]*$/;
        if (profile.avatarId != null && !re.test(profile.avatarId)) {
            state.avatarId = Global.baseUrl + "/" + profile.avatarId;
        }
        state.phone = profile.phone;
        state.email = profile.email;
        state.aboutMe = profile.aboutMe
    },
    UPDATE_PROFILE: (state, profile) => {
        state.username = profile.username;
        var re = /^[ ]*$/;
        if (profile.avatarId != null && !re.test(profile.avatarId)) {
            state.avatarId = Global.baseUrl + "/" + profile.avatarId;
        }

        state.phone = profile.phone;
        state.email = profile.email;
        state.aboutMe = profile.aboutMe;
    },
    UPDATE_AVATAR: (state, avatar) => {
        var re = /^[ ]*$/;
        if (avatar != null && !re.test(avatar)) {
            state.avatarId = Global.baseUrl + "/" + avatar;
        }
    }
};

const actions = {

    getProfile({ commit }) {
        return new Promise((resolve, reject) => {
            userApi.getProfile().then(response => {
                const profile = response.data;
                commit('SET_PROFILE', profile);
                resolve(response)
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

                commit("UPDATE_PROFILE", response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    uploadAvatarId({ commit }, { file }) {
        return new Promise((resolve, reject) => {
            userApi.uploadAvatar(file).then(response => {
                console.log(response.data.data);
                commit("UPDATE_AVATAR", response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

};

export default { state, mutations, actions };