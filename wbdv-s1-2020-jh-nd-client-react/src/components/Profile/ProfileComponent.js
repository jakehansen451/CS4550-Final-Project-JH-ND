import React from 'react';
import {connect} from 'react-redux';
import UserService from "../../services/UserService";
import EditProfileComponent from './EditProfile/EditProfileComponent';
import {Link} from "react-router-dom";
import {isEmpty} from "../../utils/Utils";

class ProfileComponent extends React.Component {
  state = {
    userId: this.props.match.params.userId,
    user: {}
  };

  componentDidMount() {
    UserService.getUser(this.state.userId)
    .then(user => this.setState({user}));
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);