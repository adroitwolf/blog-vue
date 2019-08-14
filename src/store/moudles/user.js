import userApi from '@/api/user'

const state = {
    username: '123',
    password: '',
    token: null,
    avatarId: '',
    phone: '',
    email: '',
    aboutMe: ''
};

const getters = {
    getToken: state => state.token,
    getUsername: state => state.username,
    getAvatarId: state => state.avatarId,
    getPhone: state => state.phone,
    getEmail: state => state.email,
    getAboutMe: state => state.aboutMe,
};


const mutations = {

    setToken: (state, token) => {
        state.token = token
    },

    setProfile: (state, profile) => {
        state.username = profile.username,
            state.avatarId = profile.avatarId,
            state.phone = profile.phone,
            state.email = profile.email,
            state.aboutMe = profile.aboutMe
    },
    updateProfile: (state, profile) => {
        state.username = profile.username,
            state.avatarId = profile.avatarId,
            state.phone = profile.phone,
            state.email = profile.email
        state.aboutMe = profile.aboutMe
    }
};

const actions = {
    login({ commit }, { username, password }) {
        return new Promise((resolve, reject) => {
            userApi.login(username, password)
                .then(response => {
                    const token = response.data.accsess_token;
                    localStorage.setItem('token', token);
                    commit('setToken', token);
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    getProfile({ commit }) {
        return new Promise((resolve, reject) => {
            userApi.getProfile().then(response => {
                console.log(response.data);
                const profile = response.data;
                commit('setProfile', profile);
                localStorage.setItem("username", profile.username);
                localStorage.setItem('avatarId', profile.avatarId);
                resolve(response)
            }).catch(error => {
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

        console.log(username + phone + email + aboutMe)

        return new Promise((resolve, reject) => {
            userApi.updateProfile(username, phone, email, aboutMe).then(response => {
                commit("updateProfile", response.data.data);
                localStorage.setItem("username", response.data.data.username);
                localStorage.setItem('avatarId', response.data.data.avatarId);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            userApi.logout().then(response => {
                localStorage.removeItem("token");
                commit("setToken", null);
                resolve(reject);
            }).catch(error => {
                reject(error);
            })
        })
    }
};

export default { state, getters, mutations, actions };