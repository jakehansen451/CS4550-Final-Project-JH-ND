import {herokuApiUrl as url} from '../config';

const createEvent = (event) => {
    let eventDemo = {
        "title": "New from Front End",
        "start": "2020-06-20T16:04:19.398Z",
        "end": "2020-06-20T18:04:19.398Z",
        "participants": [],
        "organizer": {
            "username": "admin",
            "firstName": "Ad",
            "lastName": "Min",
            "password": "admin",
            "email": "admin@school.edu",
            "accessToken": "ya29.a0AfH6SMCww1G1AnxpKYNedtpOGJyBu5dnx5H5iSmRqFzxUVVRqCfcgz17LD_5XIRRe71aPrtNaMAvTrW0YfukxQ8jiBteM_pQKDYNQjU5fZ_BtzL-vmASAZYVFPV-UuXwl2F9WB2dUBQORsKJDC11AtG0lPmqni3YqdA",
            "refreshToken": "1//0dnnC6N4dEQqRCgYIARAAGA0SNwF-L9IrOajrj1Xfq4hOqIJDV097p8zma9J-N9sj4canDoV5tS0RhKlAWbn6H4VkdTOFey_yjfc",
            "role": "ADMIN",
            "_id": 21
        },
        "course" : {
            "title": "CS3800",
            "abbreviation": null,
            "number": null,
            "admin": {
                "username": "admin",
                "firstName": "Ad",
                "lastName": "Min",
                "password": "admin",
                "email": "admin@school.edu",
                "accessToken": "ya29.a0AfH6SMCww1G1AnxpKYNedtpOGJyBu5dnx5H5iSmRqFzxUVVRqCfcgz17LD_5XIRRe71aPrtNaMAvTrW0YfukxQ8jiBteM_pQKDYNQjU5fZ_BtzL-vmASAZYVFPV-UuXwl2F9WB2dUBQORsKJDC11AtG0lPmqni3YqdA",
                "refreshToken": "1//0dnnC6N4dEQqRCgYIARAAGA0SNwF-L9IrOajrj1Xfq4hOqIJDV097p8zma9J-N9sj4canDoV5tS0RhKlAWbn6H4VkdTOFey_yjfc",
                "role": "ADMIN",
                "_id": 21
            },
            "_id": 21
        }
    };

    fetch(`${url}/events/`, {
        method: 'POST',
        body: JSON.stringify(eventDemo),
        headers: {'content-type': 'application/json'}
    }).then(response => response.json()).then(json => console.log(json));
};


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