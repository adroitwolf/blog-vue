import attachmentApi from '@/api/attachment'
const state = {
    mediaTypes: [],
}

const mutations = {
    SET_MEDIA_TYPE(state, mediaTypes) {
        state.mediaTypes = mediaTypes;
    }
}

const actions = {
    listAllMediaType({ commit }) {
        return new Promise((resolve, reject) => {
            attachmentApi.listAllMediaType().then(response => {
                const mediaTypes = response.data;
                commit('SET_MEDIA_TYPE', mediaTypes);
                resolve(mediaTypes);
            }).catch(error => {
                reject(error);
            })
        })
    }
}


export default { state, mutations, actions }