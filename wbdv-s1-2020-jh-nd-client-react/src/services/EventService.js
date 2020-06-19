import {herokuApiUrl as url} from '../config';

const createEvent = (start, end, title, courseId, hostId, userIds) =>
  fetch(`${url}/events/v2`
  .concat(`?start=${start}`, `&end=${end}`, `&title=${title}`,
      `&courseId=${courseId}`, `&organizerId=${hostId}`,
      `&attendeesIds=${userIds}`), {
    method: 'POST',
    headers: {'content-type': 'application/json'}
  }).then(response => response.json());

const updateEvent = (eventId, event) =>
    fetch(`${url}/events/${eventId}`, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {'content-type': 'application/json'}
    }).then(response => response.json());

const deleteEvent = (eventId) => {
  return fetch(`${url}/events/${eventId}`, {method: 'DELETE'})
  .then(response => response.json());
};

const getEvent = (eventId) =>
    fetch(`${url}/events/${eventId}`)
    .then(response => response.json());

const getAllEvents = () =>
    fetch(`${url}/events/`)
    .then(response => response.json());

const getFreeTimesForUsers = (userIdsString, startTime, endTime) => {
  console.log(userIdsString);
  console.log(startTime);
  console.log(endTime);
  const urlString = `${url}/free/users/${userIdsString}?start=${startTime}&end=${endTime}`;
  console.log(urlString);
  return fetch(urlString)
  .then(response => response.json());
};

export default {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  getFreeTimesForUsers,
};