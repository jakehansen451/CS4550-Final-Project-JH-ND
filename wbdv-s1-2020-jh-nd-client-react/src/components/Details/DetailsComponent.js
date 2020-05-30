import React from "react";
import googleService from "../../api/GoogleAPIService";

class DetailsComponent extends React.Component {

    componentDidMount() {
        googleService.handleClientLoad(() => {})
    }

    render() {
        return (
            <div>
                <h1>
                    Details
                </h1>

                <button onClick={() => googleService.addEvent(
                    '2020-06-02T09:00:00-07:00',
                    '2020-06-02T11:30:00-07:00',
                    [],
                    "Title")}>
                    Add event
                </button>
            </div>
        );
    }
}

export default DetailsComponent;