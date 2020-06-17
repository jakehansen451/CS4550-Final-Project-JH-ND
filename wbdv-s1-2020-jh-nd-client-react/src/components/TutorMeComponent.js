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
import {Redirect} from "react-router-dom";
import * as Actions from '../store/Actions';
import '../styles.css';
import CourseDetailComponent from "./CourseDetail/CourseDetailComponent";
import UserService from "../services/UserService";

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
                   exact
                   component={CourseBrowserComponent}/>
            <Route path="/courses/:courseId"
                   exact
                   component={CourseDetailComponent}/>
          </div>
        </BrowserRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(Actions.setUser(user)),
});

export default connect(null, mapDispatchToProps)(TutorMeComponent);