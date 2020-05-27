import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import SearchComponent from "./SearchComponent";
import DetailsComponent from "./DetailsComponent";
import ResultsComponent from "./ResultsComponent";

import authorization from '../api/OauthService';

class TutorMeComponent extends React.Component {
    componentDidMount() {
        authorization.oauthService();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/"
                           exact
                           component={HomeComponent}/>
                    <Route path="/search"
                           exact
                           component={SearchComponent}/>
                    <Route path="/results"
                           exact
                           component={ResultsComponent}/>
                    <Route path="/details/"
                           exact
                           component={DetailsComponent}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default TutorMeComponent