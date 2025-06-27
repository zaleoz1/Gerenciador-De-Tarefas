function getToken() {
    return localStorage.getItem('jwtToken');
}

function setToken(token) {
    localStorage.setItem('jwtToken', token);
}

function removeToken() {
    localStorage.removeItem('jwtToken');
}

export { getToken, setToken, removeToken };