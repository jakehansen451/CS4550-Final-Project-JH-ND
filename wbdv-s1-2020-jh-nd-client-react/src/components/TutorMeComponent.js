import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import SearchComponent from "./Search/SearchComponent";
import DetailsComponent from "./Details/DetailsComponent";
import ResultsComponent from "./Results/ResultsComponent";
import LoginComponent from "./Login/LoginComponent";
import RegisterComponent from './Register/RegisterComponent';
import ProfileComponent from "./Profile/ProfileComponent";
import CourseBrowserComponent from "./CourseBrowser/CourseBrowserComponent";
import {Redirect} from "react-router-dom";
import '../styles.css';
import CourseDetailComponent from "./CourseDetail/CourseDetailComponent";

class TutorMeComponent extends React.Component {

  render() {
    return (
        <BrowserRouter>
          <div>
            <Route
                path="/:url*"
                exact
                strict
                render={props => <Redirect to={`${props.location.pathname}/`}/>}/>
            <Route path="/"
                   exact
                   component={HomeComponent}/>
            <Route path="/search/"
                   exact
                   component={SearchComponent}/>
            <Route path="/results/"
                   exact
                   component={ResultsComponent}/>
            <Route path="/details/"
                   exact
                   component={DetailsComponent}/>
            <Route path="/login/"
                   exact
                   component={LoginComponent}/>
            <Route path="/register/"
                   exact
                   component={RegisterComponent}/>
            <Route path="/profile/:userId"
                   component={ProfileComponent}
                   exact/>
            <Route path="/courses/"
                   component={CourseBrowserComponent}
                   exact/>
            <Route path="/courses/:courseId"
                   component={CourseDetailComponent}
                   exact/>
          </div>
        </BrowserRouter>
    )
  }
}

export default TutorMeComponent