import userApi from '@/api/user'
import Global from '@/util/Global'
const state = {
    username: '',

    avatarId: '',
    phone: '',
    email: '',
    aboutMe: ''
};

const getters = {
    getUsername: state => state.username,
    getAvatarId: state => state.avatarId,
    getPhone: state => state.phone,
    getEmail: state => state.email,
    getAboutMe: state => state.aboutMe,
};


const mutations = {


    setProfile: (state, profile) => {
        state.username = profile.username;
        var re = /^[ ]*$/;
        if (profile.avatarId != null && !re.test(profile.avatarId)) {
            state.avatarId = Global.baseUrl + "/" + profile.avatarId;
        }
        state.phone = profile.phone;
        state.email = profile.email;
        state.aboutMe = profile.aboutMe
    },
    updateProfile: (state, profile) => {
        state.username = profile.username;
        var re = /^[ ]*$/;
        if (profile.avatarId != null && !re.test(profile.avatarId)) {
            state.avatarId = Global.baseUrl + "/" + profile.avatarId;
        }

        state.phone = profile.phone;
        state.email = profile.email;
        state.aboutMe = profile.aboutMe;
    },
    updateAvatar: (state, avatar) => {
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
                commit('setProfile', profile);
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

                commit("updateProfile", response.data.data);
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
                commit("updateAvatar", response.data.data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }

};

export default { state, getters, mutations, actions };