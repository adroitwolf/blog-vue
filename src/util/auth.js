import Cookies from 'js-cookie'

const TokenKey = 'Authentication'

export function getToken() {
    let token = Cookies.get(TokenKey);
    if(token){
        return JSON.parse(token);
    }else{
        return  localStorage.getItem(TokenKey) ?localStorage.getItem(TokenKey):null ;
    }
}

export function setToken(token) {
    localStorage.setItem(TokenKey,token)
    return Cookies.set(TokenKey, token)
}


export function removeToken() {
    return Cookies.remove(TokenKey)
}