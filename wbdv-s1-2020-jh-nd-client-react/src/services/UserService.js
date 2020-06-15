import { localApiUrl as url } from '../config';

const createUser = (user) =>
    fetch(`${url}/users/`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json());

const updateUser = (userId, user) =>
    fetch(`${url}/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json());

const deleteUser = (userId) => {
  return fetch(`${url}/users/${userId}`, {method: 'DELETE'})
  .then(response => response.json());
};

const getUser = (userId) =>
    fetch(`${url}/users/${userId}`)
    .then(response => response.json());

const getAllUsers = () =>
    fetch(`${url}/users/`)
    .then(response => response.json());

export default {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers
}