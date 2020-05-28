import googleOAuth from "./GoogleOAuth2Service";

let accessToken = "ya29.a0AfH6SMCDI_gU5gN1vpDgrkXFhcJLM3kt9iCLrq4jGWeSNMS4sT0_StK_bcVsYSXIPz3iQ4CUmP_P3J1KFreQr84rTrhvy-Ng9z3EMvqHbigE9We4lyFPQVWAzbKyWV4T_YHtEIaY-zK6lnL2Q1-RYw02jRuL2R8WIHE"; // TODO: get this token from redux
let calendarId = "en.usa%23holiday%40group.v.calendar.google.com";
let apiKey = "AIzaSyBNECVLm6gneH9sx6OT1DZLzqsFEhuCNCA";
let apiURl = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events?key=" + apiKey + '&access_token=' + accessToken;


const getEvents = () => {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", apiURl);

    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response);
        } else if (xhr.readyState === 4 && xhr.status === 401) {
            // Token invalid, so prompt for user permission.
            googleOAuth.oauth2SignIn();
        }
    };

    // This line actually sends the request???
    xhr.send(null);
};

export default {
    getEvents
}