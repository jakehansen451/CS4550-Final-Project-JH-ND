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
      headers: {'content-type': 'application/json'},
      credentials: 'include'
    }).then(response => response.json());

const deleteUser = (userId) => {
  return fetch(`${url}/users/${userId}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(response => response.json());
};

const getUser = (userId) =>
    fetch(`${url}/users/${userId}`)
    .then(response => {
      if (response.status === 404) return null;
      else return response.json();
    });

const getAllUsers = () =>
    fetch(`${url}/users/`)
    .then(response => response.json());

const login = (userInfo) =>
    fetch(`${url}/login`, {
      body: JSON.stringify(userInfo),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      credentials: "include"
    }).then(response => {
      if (response.status === 404) return null;
      else return response.json();
    });

const logout = () =>
    fetch(`${url}/logout`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      credentials: "include"
    }).then(response => response.json());

const register = (userInfo) =>
  fetch(`${url}/register`, {
    body: JSON.stringify(userInfo),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    credentials: "include"
  }).then(response => response.json());

const getSession = () =>
    fetch(`${url}/profile`, {
      method: 'POST',
      credentials: 'include'
    }).then(response => {
      if (response.status === 404) return null;
      else return response.json();
    });

const getTutorsForCourse = (courseId) =>
    fetch(`${url}/users/tutors/${courseId}/`)
    .then(response => {
      if (response.status === 404) return null;
      else return response.json();
    });

const getStudentsForCourse = (courseId) =>
    fetch(`${url}/users/students/${courseId}/`)
    .then(response => {
      if (response.status === 404) return null;
      else return response.json();
    });

export default {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  login,
  logout,
  register,
  getSession,
  getTutorsForCourse,
  getStudentsForCourse,
}