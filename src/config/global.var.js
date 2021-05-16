const BASE_URL = process.env.VUE_APP_BASEURL;

// 获取图片地址
const getImagePath = (path) =>{

    if(path == null || path == ''){
        return path;
    }
    return BASE_URL + '/' + path;
}
export {
    BASE_URL,
    getImagePath
}