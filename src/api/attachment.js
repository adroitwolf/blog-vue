import service from '@/util/service'

const baseUrl = '/api/admin/attachment'

const attachmentApi = {}

attachmentApi.getAttachmentList = (pageSize, pageNum) => {
    return service({
        method: 'get',
        url: `${baseUrl}/list`,
        params: {
            pageSize: pageSize,
            pageNum: pageNum
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


export default attachmentApi