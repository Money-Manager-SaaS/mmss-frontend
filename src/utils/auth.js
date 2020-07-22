const tokenKey = 'RefreshToken';

export function getRefreshToken() {
  return localStorage.getItem(tokenKey);
}

export function setRefreshToken(token) {
  return localStorage.setItem(tokenKey, token);
}

export function removeRefreshToken() {
  return localStorage.removeItem(tokenKey);
}
