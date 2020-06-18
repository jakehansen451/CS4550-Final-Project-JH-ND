import {gapi} from 'gapi-script';
import UserService from "../services/UserService";
import React from "react";
import {connect} from "react-redux";
import * as Actions from "../store/Actions";

import store from '../store/Store';


const SCOPE = 'https://www.googleapis.com/auth/calendar';
const CLIENT_ID = '46098970829-859lp0f58tvg2o77h1g8iclvgpflf17v.apps.googleusercontent.com';
let API_KEY = "AIzaSyBNECVLm6gneH9sx6OT1DZLzqsFEhuCNCA";
let calendarId = "5op33saotih66kdu8inudbuca4@group.calendar.google.com"; // TutorMe calendar's id

const url = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=46098970829-859lp0f58tvg2o77h1g8iclvgpflf17v.apps.googleusercontent.com&redirect_uri=http://localhost:3000/Callback&response_type=code&scope=https://www.googleapis.com/auth/calendar';


const handleClientLoad = () => {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', () => initClient());

};

const initClient = () => {
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
    }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus();

    }, function (error) {
        console.log(JSON.stringify(error, null, 2));
    });
};

const updateSigninStatus = () => {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        let accessToken = gapi.auth2.getAuthInstance().currentUser.je.uc.access_token;
        let user = store.getState().current_user;
        if (user.accessToken === null) {
            UserService.updateUser(user._id, {...user, "accessToken": accessToken}).then(r => console.log(r))
        }
    } else {
        handleAuthClick()
    }
};

const handleAuthClick = (event) => {
    //gapi.auth2.getAuthInstance().signIn();
    fetch(url).then(r => console.log(r));
};

const handleSignoutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();
};

export default {
    handleSignoutClick,
    handleAuthClick,
    handleClientLoad
}