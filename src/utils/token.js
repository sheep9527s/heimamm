const KEY = 'mmtoken';

// 1.设置token
export function setToken(token) {
    localStorage.setItem(KEY, token);
}

// 2.获取token
export function getToken() {
   return  localStorage.getItem(KEY);
}


// 3.移除token
export function removeToken() {
    localStorage.removeItem(KEY);
}
