import React from "react";
import googleOauth from "../api/GoogleOAuth2Service";
import googleCalendar from "../api/GoogleCalendarService";

class LoginComponent extends React.Component {
    componentDidMount() {
        let accessToken = "ya29.a0AfH6SMCDI_gU5gN1vpDgrkXFhcJLM3kt9iCLrq4jGWeSNMS4sT0_StK_bcVsYSXIPz3iQ4CUmP_P3J1KFreQr84rTrhvy-Ng9z3EMvqHbigE9We4lyFPQVWAzbKyWV4T_YHtEIaY-zK6lnL2Q1-RYw02jRuL2R8WIHE"; // TODO: get this token from redux

        if (accessToken === "") {
            googleOauth.oauth2SignIn();
        }
    }

    makeGoogleRequest = () => {
        googleCalendar.getEvents();
    };

    render() {
        return (
            <div>
                <h1>
                    User has already given permissions to access the calendar!
                </h1>
                <button className="btn btn-primary" onClick={this.makeGoogleRequest}>
                    Click me
                </button>
            </div>
        );
    }

}


export default LoginComponent;