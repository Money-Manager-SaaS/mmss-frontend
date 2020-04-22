const userEmail = 'userEmail';

export function getEmail() {
  return localStorage.getItem(userEmail);
}

export function setEmail(email) {
  return localStorage.setItem(userEmail, email);
}

export function removeEmail() {
  return localStorage.removeItem(userEmail);
}
