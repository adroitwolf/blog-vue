import service from '@/config/service'

const baseUrl = "/iblog-blog/api/comment"


const commentApi = {}


commentApi.pushComment = (comment) => {
    return service({
        url: `${baseUrl}/comments`,
        method: 'post',
        data: comment
    })
}

commentApi.getCommentsList = (id, params) => {
    return service({
        url: `${baseUrl}/${id}/comments`,
        method: 'get',
        params: params
    })
}

export default commentApi