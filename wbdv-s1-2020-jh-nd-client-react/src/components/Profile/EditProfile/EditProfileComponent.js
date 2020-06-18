import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../../store/Actions';
import UserService from "../../../services/UserService";

class EditProfileComponent extends React.Component {
  state = {
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    role: this.props.current_user.role,
  };

  updateProfile = () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert('Passwords must match');
      return;
    }

    const updatedProfile = {
      ...this.props.current_user,
      password: this.state.password || this.props.current_user.password,
      firstName: this.state.firstName || this.props.current_user.firstName,
      lastName: this.state.lastName || this.props.current_user.lastName,
      email: this.state.email || this.props.current_user.email,
      role: this.state.role || this.props.current_user.role,
    };

    if (updatedProfile !== this.props.current_user) {
      UserService.updateUser(this.props.current_user._id, updatedProfile)
      .then(user => this.props.setUser(user));
    }
  };

  render() {
    return (
        <div>
          <div>
            <label>Password:</label>
            <input
                onChange={(e) => this.setState({password: e.target.value})}
            />
          </div>
          <div>
            <div>
              <label>Confirm password:</label>
              <input
                  onChange={(e) => this.setState(
                      {confirmPassword: e.target.value})}
              />
            </div>
            <div>
              <label>First name:</label>
              <input
                  onChange={(e) => this.setState({firstName: e.target.value})}
              />
            </div>
            <div>
              <label>Last name:</label>
              <input
                  onChange={(e) => this.setState({lastName: e.target.value})}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                  onChange={(e) => this.setState({email: e.target.value})}
              />
            </div>
            <div>
              <div>Role:</div>
              <select
                  defaultValue={this.state.role}
                  onChange={(e) => this.setState({role: e.target.value})}
              >
                <option value={'STUDENT'}>Student</option>
                <option value={'TUTOR'}>Tutor</option>
                <option value={'ADMIN'}>Admin</option>
              </select>
            </div>
          </div>
          <div>
            <button onClick={this.updateProfile}>
              Update Profile
            </button>
            <button
                onClick={this.props.deleteUser}
            >
              Delete Profile
            </button>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(Actions.setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    EditProfileComponent);