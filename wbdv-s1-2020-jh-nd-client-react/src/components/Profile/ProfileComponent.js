import React from 'react';
import {connect} from 'react-redux';
import UserService from "../../services/UserService";
import EditProfileComponent from './EditProfile/EditProfileComponent';
import {Link} from "react-router-dom";

class ProfileComponent extends React.Component {
  courseRow = (course, index) => {
    return (
        <div key={index}>
          <Link to={`/courses/${course._id}`}>
            {course.title}
          </Link>
        </div>
    )
  };

  editProfileSection = () => <EditProfileComponent />;

  render() {
    //const userId =this.props.match.params.userId;
    //const user = UserService.getUser(userId);
    const user = this.props.users.find(user => user._id === this.props.match.params.userId);

    return (
        <div>
          <h2>Profile</h2>
          <div>
            <div>
              <div>
                <div>Username:</div>
                <div>{user.username}</div>
              </div>
              <div>
                <div>Name:</div>
                <div>{`${user.lastName}, ${user.firstName}`}</div>
              </div>
              <div>
                <div>Role:</div>
                <div>{user.role}</div>
              </div>
              <div>
                <div>Email:</div>
                <div>{user.email}</div>
              </div>
            </div>
            <div>
              {(user.role === 'STUDENT' || user.role === 'TUTOR') &&
              <div>
                <div>User is enrolled in:</div>
                {user.roleData.coursesEnrolled.map(this.courseRow)}
              </div>}
              {(user.role === 'ADMIN' || user.role === 'TUTOR') &&
              <div>
                <div>User is course staff for:</div>
                {user.roleData.coursesTaught.map(this.courseRow)}
              </div>}
            </div>
          </div>
          {user._id === this.props.current_user._id && this.editProfileSection()}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);