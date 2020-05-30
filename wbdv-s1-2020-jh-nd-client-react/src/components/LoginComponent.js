import React from "react";
import oauth from "../api/GoogleAPIService";

class LoginComponent extends React.Component {

    componentDidMount() {
        oauth.handleClientLoad();
    }

    makeGoogleRequest = () => {
        let signIn = oauth.isUserSignedIn();
        if(!signIn) {
            oauth.signIn()
        }

        oauth.getEventsList();
    };

    render() {
        return (
            <div>
                <h1>
                    User has already given permissions to access the calendar!
                </h1>


                <button className="btn btn-primary" onClick={this.makeGoogleRequest}>
                    Get TutorMe events
                </button>
            </div>
        );
    }

}


export default LoginComponent;