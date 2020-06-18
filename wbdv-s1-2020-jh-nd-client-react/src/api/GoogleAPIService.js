import {gapi} from 'gapi-script';
import React from "react";


import store from '../store/Store';
import {localApiUrl as url} from "../config";


const SCOPE = 'https://www.googleapis.com/auth/calendar';
const CLIENT_ID = '46098970829-859lp0f58tvg2o77h1g8iclvgpflf17v.apps.googleusercontent.com';
let API_KEY = "AIzaSyBNECVLm6gneH9sx6OT1DZLzqsFEhuCNCA";



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
        console.log("Initialization of gapi complete")
    }, (error) => {
        console.log(JSON.stringify(error, null, 2));
    });
};

const handleAuthClick = (event) => {
    gapi.auth2.getAuthInstance().grantOfflineAccess()
        .then(r => getRefreshToken(r.code))
};

const handleSignoutClick = (event) => {
    gapi.auth2.getAuthInstance().signOut();

};

const getRefreshToken = (code) => {
    let url = "https://accounts.google.com/o/oauth2/token";

    let xhr = new XMLHttpRequest();
    xhr.open('POST',
        url + '?grant_type=authorization_code&client_id='
        + CLIENT_ID + '&client_secret=0sN5dhbDPgF7ePLlZFvNWBKL&code='
        + code + '&redirect_uri=http://localhost:3000');

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === 4) {
            console.log(xhr.response);
            sendData(xhr.response).then(r => console.log(r))
        }
    };

    xhr.send(null);

};

const sendData = (data) =>
    fetch(`${url}/users/` + store.getState().current_user._id + `/tokens`, {
        method: 'POST',
        body: data,
        headers: {'content-type': 'application/json'}
    }).then(response => console.log(response.body));

const isSignedIn = () => {
    return gapi.auth2.getAuthInstance().isSignedIn.get();


};

export default {
    handleSignoutClick,
    handleAuthClick,
    handleClientLoad,
    isSignedIn
}