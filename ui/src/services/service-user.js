import config from 'config';
import { authService } from '../services';
import { handleResponse } from './utils';

export const userService = {
  getAll,
  create
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authService.authHeader()
  };
  return fetch(`${config.apiUrl}/users`, requestOptions)
    .then(handleResponse);
}

function create(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${config.apiUrl}/users/create`, requestOptions)
    .then(handleResponse)
    .then(user => {
      return user;
    });
}

