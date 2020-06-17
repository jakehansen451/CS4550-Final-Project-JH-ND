import React from 'react';
import {connect} from 'react-redux';
import EditProfileComponent from './EditProfile/EditProfileComponent';
import {Link} from "react-router-dom";
import {isEmpty} from "../../utils/Utils";
import * as Actions from '../../store/Actions';
import UserService from "../../services/UserService";
import GoogleAPIService from "../../api/GoogleAPIService";

class ProfileComponent extends React.Component {

  state = {
    userId: this.props.match.params.userId,
    user: {}
  };

  componentDidMount() {
      GoogleAPIService.handleClientLoad();
    UserService.getUser(this.state.userId)
    .then(user => this.setState({user}));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.current_user._id === this.state.user._id
        && this.props.current_user !== this.state.user) {
      this.setState({user: this.props.current_user});
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
          {(this.state.user.role === 'STUDENT' || this.state.user.role
              === 'TUTOR') &&
          <div>
            <div>User is enrolled in:</div>
            {this.state.user.roleData.coursesEnrolled.map(
                this.courseRow)}
          </div>}
          {(this.state.user.role === 'ADMIN' || this.state.user.role
              === 'TUTOR') &&
          <div>
            <div>User is course staff for:</div>
            {this.state.user.roleData.coursesTaught.map(this.courseRow)}
          </div>}
        </div>
    )
  };

  editProfileSection = () => <EditProfileComponent/>;

  render() {
    return (
        (this.state.user && !isEmpty(this.state.user))
            ?
            <div>
              <h2>Profile</h2>
              <div>
                <div>
                  <div>
                    <div>Username:</div>
                    <div>{this.state.user.username}</div>
                  </div>
                  <div>
                    <div>Name:</div>
                    <div>{`${this.state.user.lastName}, ${this.state.user.firstName}`}</div>
                  </div>
                  <div>
                    <div>Role:</div>
                    <div>{this.state.user.role}</div>
                  </div>
                  <div>
                    <div>Email:</div>
                    <div>{this.state.user.email}</div>
                  </div>
                </div>

              </div>
              {this.state.user._id === this.props.current_user._id
              && this.editProfileSection()}
                <button onClick={(event) => GoogleAPIService.handleAuthClick(event)}>Authorize</button>
                <button onClick={(event) => GoogleAPIService.handleSignoutClick(event)}>Sign out</button>
            </div>

            :
            <h2>
              User not found.
            </h2>

    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(Actions.setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);