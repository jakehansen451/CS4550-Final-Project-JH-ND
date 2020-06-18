import React from 'react';
import {connect} from 'react-redux';
import EditProfileComponent from './EditProfile/EditProfileComponent';
import {Link} from "react-router-dom";
import {isEmpty} from "../../utils/Utils";
import * as Actions from '../../store/Actions';
import UserService from "../../services/UserService";
import GoogleAPIService from "../../api/GoogleAPIService";
import CourseService from "../../services/CourseService";
import '../../styles.css';
import './ProfileComponent.css';
import NavigatorComponent from "../Navigator/NavigatorComponent";

class ProfileComponent extends React.Component {

  state = {
    userId: this.props.match.params.userId,
    user: {},
    coursesTaught: [],
    coursesTutored: [],
    coursesEnrolled: []
  };

  componentDidMount() {
    UserService.getSession()
    .then(response => response && this.props.setUser(response));

    GoogleAPIService.handleClientLoad();
    UserService.getUser(this.state.userId)
    .then(user => this.setState({user}));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.current_user && this.state.user
        && !isEmpty(this.props.current_user)
        && !isEmpty(this.state.user)) {

      if (this.props.current_user._id === this.state.user._id
          && this.props.current_user !== this.state.user) {
        this.setState({user: this.props.current_user});
      }

      if (this.props !== prevProps) {
        if (this.state.user.role === 'ADMIN') {
          CourseService.findCoursesUserTeaches(this.state.userId)
          .then(courses => this.setState({coursesTaught: courses}));
        } else if (this.state.user.role === 'TUTOR') {
          CourseService.findCoursesUserTutors(this.state.userId)
          .then(courses => this.setState({coursesTutored: courses}));
          CourseService.findCoursesUserIsEnrolled(this.state.userId)
          .then(courses => this.setState({coursesEnrolled: courses}));
        } else if (this.state.user.role === 'STUDENT') {
          CourseService.findCoursesUserIsEnrolled(this.state.userId)
          .then(courses => this.setState({coursesEnrolled: courses}));
        }
      }
    }
  }

  courseRow = (course, index) => {
    return (
        <div key={index}>
          <Link to={`/courses/${course._id}`}>
            {course.title}
          </Link>
        </div>
    )
  };

  renderCourseLists = () => {
    return (
        <div>
          {this.state.user.role === 'STUDENT' &&
          <div>
            {this.state.coursesEnrolled.length > 0 &&
            <div>User is enrolled in:</div>}
            {this.state.coursesEnrolled.map(this.courseRow)}
          </div>}
          {this.state.user.role === 'TUTOR' &&
          <div className='wbdv-course-list-two-column'>
            {this.state.coursesTutored.length > 0 &&
            <div className='wbdv-tutor-tutored-col'>
              <div>User is course staff for:</div>
              {this.state.coursesTutored.map(this.courseRow)}
            </div>}
            {this.state.coursesEnrolled.length > 0 &&
            <div className='wbdv-tutor-enrolled-col'>
              <div>User is enrolled in:</div>
              {this.state.coursesEnrolled.map(this.courseRow)}
            </div>}
          </div>}
          {this.state.user.role === 'ADMIN' &&
          <div>
            {this.state.coursesTaught.length > 0 &&
            <div>User is the course administrator for:</div>}
            {this.state.coursesTaught.map(this.courseRow)}
          </div>}
        </div>
    )
  };

  deleteUser = () => {
    UserService.deleteUser(this.state.userId)
    .then(response => {
          console.log(response);
          this.props.logout();
          this.props.history.push('/login/');
        }
    )
  };

  render() {
    return (
        <div className='wbdv-profile'>
          <NavigatorComponent
              currentPage={this.props.history.location.pathname}/>
          {(this.state.user && !isEmpty(this.state.user))
          ?
          <div>
            <h2>Profile</h2>
            <div>
              <div className='wbdv-profile-two-column'>
                <div className='wbdv-info-column'>
                  <div className='wbdv-profile-row'>
                    <div className='wbdv-info-column-label'>
                      Username:
                    </div>
                    <div className='wbdv-info-column-value'>
                      {this.state.user.username}
                    </div>
                  </div>
                  <div className='wbdv-profile-row'>
                    <div className='wbdv-info-column-label'>
                      Name:
                    </div>
                    <div className='wbdv-info-column-value'>
                      {`${this.state.user.lastName}, ${this.state.user.firstName}`}
                    </div>
                  </div>
                  <div className='wbdv-profile-row'>
                    <div className='wbdv-info-column-label'>
                      Role:
                    </div>
                    <div className='wbdv-info-column-value'>
                      {this.state.user.role}
                    </div>
                  </div>
                  <div className='wbdv-profile-row'>
                    <div className='wbdv-info-column-label'>Email:</div>
                    <div className='wbdv-info-column-value'>
                      {this.state.user.email}
                    </div>
                  </div>
                </div>
                <div className='wbdv-course-list-column'>
                  {this.renderCourseLists()}
                </div>
              </div>
              {this.state.user._id === this.props.current_user._id &&
              <EditProfileComponent
                  deleteUser={this.deleteUser}
              />}
            </div>
            <div>
              <button onClick={(event) => GoogleAPIService.handleAuthClick(
                  event)}>Authorize
              </button>
              <button onClick={(event) => GoogleAPIService.handleSignoutClick(
                  event)}>Sign out
              </button>
            </div>
          </div>
          :
          <h2>
            User not found.
          </h2>}
        </div>

    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(Actions.setUser(user)),
  logout: () => dispatch(Actions.deselectUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);