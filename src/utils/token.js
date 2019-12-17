const KEY = 'mmtoken';

// 1.设置token
export function getToken(token) {
    localStorage.setItem(KEY, token);
}

// 2.获取token
export function setToken() {
    localStorage.getItem(KEY);
}


// 3.移除token
export function removeToken() {
    localStorage.removeItem(KEY);
}
