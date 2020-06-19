import {herokuApiUrl as url} from '../config';

const createEvent = (event) =>
    fetch(`${url}/events/`, {
      method: 'POST',
      body: JSON.stringify(event),
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

export default {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents
}