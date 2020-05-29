// import googleOAuth from "./GoogleOAuth2Service";
// //
// //
// // let apiKey = "AIzaSyBNECVLm6gneH9sx6OT1DZLzqsFEhuCNCA";
// // let apiURl = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events?key=" + apiKey + '&access_token=';
// //
// //
// // const getEvents = () => {
// //     let xhr = new XMLHttpRequest();
// //
// //     xhr.open("GET", apiURl);
// //
// //     xhr.onreadystatechange = function (e) {
// //         if (xhr.readyState === 4 && xhr.status === 200) {
// //             console.log(xhr.response);
// //         } else if (xhr.readyState === 4 && xhr.status === 401) {
// //             // Token invalid, so prompt for user permission.
// //             googleOAuth.oauth2SignIn();
// //         }
// //     };
// //
// //     // This line actually sends the request???
// //     xhr.send(null);
// // };
// //
// // export default {
// //     getEvents
// // }