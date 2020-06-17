import {gapi} from 'gapi-script';
import UserService from "../services/UserService";

let GoogleAuth;
const SCOPE = 'https://www.googleapis.com/auth/calendar';
const CLIENT_ID = '46098970829-859lp0f58tvg2o77h1g8iclvgpflf17v.apps.googleusercontent.com';

let API_KEY = "AIzaSyBNECVLm6gneH9sx6OT1DZLzqsFEhuCNCA";
let calendarId = "5op33saotih66kdu8inudbuca4@group.calendar.google.com"; // TutorMe calendar's id


const handleClientLoad = (user) => {
    console.log(user)
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', () => initClient(user));

};

const initClient = (user) => {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    let discoveryUrl = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'discoveryDocs': [discoveryUrl],
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
        let googleUser = GoogleAuth.currentUser.get();
        let isAuthorized = googleUser.hasGrantedScopes(SCOPE);
        let isSignedIn = googleUser.isSignedIn();

        if (!isAuthorized || !isSignedIn) {
            signIn()
        } else {

            let accessToken = googleUser.uc.access_token;
            console.log(accessToken);

            UserService.updateUser(user._id, {...user, "accessToken": accessToken}).then(response => console.log(response))
        }

    });
};

const signIn = () => {
    GoogleAuth.signIn()
};


const getEventsList = () => {
    return gapi.client.calendar.events.list({
        'calendarId': calendarId,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime'
    }).then((response) => {
        return  response.result.items;
    });
};

const addEvent = (startDateTime, endDateTime, attendees, title) => {
    let event = {
        'summary': title,
        'start': {
            'dateTime': startDateTime
        },
        'end': {
            'dateTime': endDateTime
        },
        'attendees': attendees
    };

    gapi.client.calendar.events.insert({
        'calendarId': calendarId,
        'resource': event
    }).then((response) => console.log(response.result));

};


export default {
    handleClientLoad,
    signIn,
    getEventsList,
    addEvent
}