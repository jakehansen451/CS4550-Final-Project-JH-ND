import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import SearchComponent from "./Search/SearchComponent";
import DetailsComponent from "./Details/DetailsComponent";
import ResultsComponent from "./Results/ResultsComponent";
import LoginComponent from "./Login/LoginComponent";
import RegisterComponent from './Register/RegisterComponent';
import ProfileComponent from "./Profile/ProfileComponent";
import CourseBrowserComponent from "./CourseBrowser/CourseBrowserComponent";
import UserService from "../services/UserService";
import EventComponent from "./Event/EventComponent";
import CourseDetailComponent from "./CourseDetail/CourseDetailComponent";
import {Redirect} from "react-router-dom";
import * as Actions from '../store/Actions';
import '../styles.css';

class TutorMeComponent extends React.Component {
  componentDidMount() {
    UserService.getSession()
    .then(response => response && this.props.login(response));
  }

  render() {
    return (
        <BrowserRouter>
          <div>
            <Route
                path="/:url*"
                exact
                strict
                render={props => <Redirect
                    to={`${props.location.pathname}/`}/>}/>
            <Route path="/"
                   exact
                   component={HomeComponent}/>
            <Route path="/search/:courseId"
                   exact
                   component={SearchComponent}/>
            <Route path="/results/:courseId/:userIds/"
                   exact
                   component={ResultsComponent}/>
            <Route path="/details/:courseId/:userIds/:startTime/:endTime/"
                   exact
                   component={DetailsComponent}/>
            <Route path="/login/"
                   exact
                   component={LoginComponent}/>
            <Route path="/register/"
                   exact
                   component={RegisterComponent}/>
            <Route path="/profile/:userId/"
                   component={ProfileComponent}
                   exact/>
            <Route path="/courses/"
                   exact
                   component={CourseBrowserComponent}/>
            <Route path="/courses/:courseId/"
                   exact
                   component={CourseDetailComponent}/>
            <Route path="/events/:eventId/"
                   exact
                   component={EventComponent}/>

          </div>
        </BrowserRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(Actions.setUser(user)),
});

export default connect(null, mapDispatchToProps)(TutorMeComponent);