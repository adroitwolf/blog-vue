import service from '@/util/service'

const baseUrl = '/api/admin/attachment'

const attachmentApi = {}

attachmentApi.getAttachmentList = (pageSize, pageNum, queryParams) => {
    return service({
        method: 'get',
        url: `${baseUrl}/list`,
        params: {
            pageSize: pageSize,
            pageNum: pageNum,
            mediaType: queryParams.mediaType,
            keywords: queryParams.keywords
        }
    })
}

attachmentApi.uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return service({
        url: `${baseUrl}/upload`,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData,
        method: 'post'

    })
}


attachmentApi.getAttachmentInfo = (id) => {
    return service({
        url: `${baseUrl}/${id}/info`,
        method: 'get'
    })
}


attachmentApi.updateAttachmentInfo = (title, id) => {
    return service({
        url: `${baseUrl}/${id}/info`,
        method: 'put',
        data: {
            title: title
        }
    })
}

attachmentApi.deletePic = (id) => {
    return service({
        url: `${baseUrl}/${id}`,
        method: 'delete'
    })
}



attachmentApi.listAllMediaType = () => {
    return service({
        url: `${baseUrl}/list_media`,
        method: 'get'
    })
}

export default attachmentApi