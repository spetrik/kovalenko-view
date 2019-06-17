import config from 'config';
import store from '../store';
import { handleResponse } from './utils';

export const authService = {
  authHeader,
  login
};

function authHeader() {
  const user = store.state.auth.user;
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${config.apiUrl}/auth/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

