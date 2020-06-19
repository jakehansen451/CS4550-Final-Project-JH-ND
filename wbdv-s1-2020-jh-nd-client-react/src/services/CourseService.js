import {herokuApiUrl as url} from '../config';

const createCourse = (course) =>
    fetch(`${url}/courses/`, {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json());

const updateCourse = (courseId, course) =>
    fetch(`${url}/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(course),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json());

const deleteCourse = (courseId) => {
  return fetch(`${url}/courses/${courseId}`, {method: 'DELETE'})
  .then(response => response.json());
};

const getCourse = (courseId) =>
    fetch(`${url}/courses/${courseId}`)
    .then(response => response.json());

const getAllCourses = () =>
    fetch(`${url}/courses/`)
    .then(response => response.json());

const getEventsForCourse = (courseId) =>
    fetch(`${url}/courses/${courseId}/events`)
    .then(response => {
      if (response.status === 404) {
        return null;
      } else {
        return response.json();
      }
    });

const addTutor = (courseId, user) =>
    fetch(`${url}/courses/${courseId}/tutors/`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

const removeTutor = (courseId, user) =>
    fetch(`${url}/courses/${courseId}/tutors/remove`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

const addStudent = (courseId, user) =>
    fetch(`${url}/courses/${courseId}/students`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

const removeStudent = (courseId, user) =>
    fetch(`${url}/courses/${courseId}/students/remove`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

const findCoursesUserTeaches = (userId) =>
    fetch(`${url}/courses/${userId}/admin`)
    .then(response => response.json());

const findCoursesUserTutors = (userId) =>
    fetch(`${url}/courses/${userId}/tutor`)
    .then(response => response.json());

const findCoursesUserIsEnrolled = (userId) =>
    fetch(`${url}/courses/${userId}/student`)
    .then(response => response.json());

export default {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getAllCourses,
  getEventsForCourse,
  addTutor,
  removeTutor,
  addStudent,
  removeStudent,
  findCoursesUserTeaches,
  findCoursesUserTutors,
  findCoursesUserIsEnrolled
}