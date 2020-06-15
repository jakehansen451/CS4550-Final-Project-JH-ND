import { localApiUrl as url } from '../config';

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

export default {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getAllCourses
}