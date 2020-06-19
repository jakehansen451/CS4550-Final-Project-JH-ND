import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../../store/Actions';
import UserService from "../../../services/UserService";
import '../../../styles.css';
import './EditProfileComponent.css';
import GoogleAPIService from "../../../api/GoogleAPIService";
import {isEmpty} from "../../../utils/Utils";

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
    const tokenExists = !isEmpty(this.props.current_user)
        && this.props.current_user.refreshToken;
    return (
        <div className='wbdv-edit-profile'>
          <br/>
          <h5>Edit Profile</h5>
          <div className='wbdv-edit-profile-input-row'>
            <label className='wbdv-edit-profile-input-label'>
              Password:
            </label>
            <input
                className='wbdv-input wbdv-edit-profile-input'
                onChange={(e) => this.setState({password: e.target.value})}
            />
          </div>
          <div>
            <div className='wbdv-edit-profile-input-row'>
              <label className='wbdv-edit-profile-input-label'>
                Confirm password:
              </label>
              <input
                  className='wbdv-input wbdv-edit-profile-input'
                  onChange={(e) => this.setState(
                      {confirmPassword: e.target.value})}
              />
            </div>
            <div className='wbdv-edit-profile-input-row'>
              <label className='wbdv-edit-profile-input-label'>
                First name:
              </label>
              <input
                  className='wbdv-input wbdv-edit-profile-input'
                  onChange={(e) => this.setState({firstName: e.target.value})}
              />
            </div>
            <div className='wbdv-edit-profile-input-row'>
              <label className='wbdv-edit-profile-input-label'>
                Last name:
              </label>
              <input
                  className='wbdv-input wbdv-edit-profile-input'
                  onChange={(e) => this.setState({lastName: e.target.value})}
              />
            </div>
            <div className='wbdv-edit-profile-input-row'>
              <label className='wbdv-edit-profile-input-label'>
                Email:
              </label>
              <input
                  className='wbdv-input wbdv-edit-profile-input'
                  onChange={(e) => this.setState({email: e.target.value})}
              />
            </div>
            <div className='wbdv-edit-profile-input-row'>
              <div>Role:</div>
              <select
                  className='wbdv-input wbdv-edit-profile-input'
                  defaultValue={this.state.role}
                  onChange={(e) => this.setState({role: e.target.value})}
              >
                <option value={'STUDENT'}>Student</option>
                <option value={'TUTOR'}>Tutor</option>
                <option value={'ADMIN'}>Admin</option>
              </select>
            </div>
          </div>
          <div className='wbdv-edit-profile-buttons'>
            <button
                className='wbdv-btn wbdv-green-btn wbdv-edit-profile-btn'
                onClick={this.updateProfile}
            >
              Update Profile
            </button>
            <button
                className='wbdv-btn wbdv-green-btn wbdv-edit-profile-btn'
                onClick={this.props.logout}
            >
              Log out
            </button>
            <button
                className={tokenExists
                    ? 'wbdv-btn wbdv-green-btn wbdv-edit-profile-btn wbdv-edit-btn-disabled'
                    : 'wbdv-btn wbdv-green-btn wbdv-edit-profile-btn'
                }
                onClick={(event) => !tokenExists &&
                  GoogleAPIService.handleAuthClick(event)
                }
            >
              Authorize
            </button>
            <button
                className='wbdv-btn wbdv-red-btn wbdv-edit-profile-btn'
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