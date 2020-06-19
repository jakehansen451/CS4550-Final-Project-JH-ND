import React from "react";
import {connect} from 'react-redux';
import {isEmpty} from '../../utils/Utils';
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import * as Actions from "../../store/Actions";
import '../../styles.css';
import './RegisterComponent.css';

class RegisterComponent extends React.Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'STUDENT',
  };

  componentDidMount() {
    UserService.getSession()
    .then(response => response && this.props.login(response));
  }

  alreadyLoggedIn = () => {
    return (
        <div className='wbdv-already-logged-in'>
          <h2>
            Already logged in.
          </h2>
          <div className='wbdv-logged-in-links'>
            <Link to={`/profile/${this.props.current_user._id}`}>
              Profile
            </Link>
            <button
                className={'wbdv-btn wbdv-link'}
                onClick={this.logout}
            >
              Log out
            </button>
          </div>
        </div>
    );
  };

  logout = () => UserService.logout()
  .then(response => this.props.logout());

  register = () => {
    if (this.state.username
        && this.state.password
        && this.state.email
        && this.state.firstName
        && this.state.lastName
        && this.state.password === this.state.confirmPassword) {
      UserService.register({
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        role: this.state.role,
      })
      .then(newUser => {
        if (newUser.status === 500) {
          alert('Registration failed. Please try a different username.');
        } else {
          this.props.login(newUser);
          this.props.history.push(`/profile/${newUser._id}`);
        }
      })
    }
  };

  registerSection = () => {
    return (
        <div className='wbdv-register'>
          <h2>Register</h2>
          <div className='wbdv-register-input-row'>
            <label className='wbdv-register-input-label'>Username:</label>
            <input
                className='wbdv-input wbdv-register-input'
                onChange={(e) => this.setState({username: e.target.value})}
            />
          </div>
          <div className='wbdv-register-input-row'>
            <label className='wbdv-register-input-label'>Password:</label>
            <input
                className='wbdv-input wbdv-register-input'
                type={'password'}
                onChange={(e) => this.setState({password: e.target.value})}
            />
          </div>
          <div>
            <div className='wbdv-register-input-row'>
              <label className='wbdv-register-input-label'>Confirm password:</label>
              <input
                  className='wbdv-input wbdv-register-input'
                  type={'password'}
                  onChange={(e) => this.setState({confirmPassword: e.target.value})}
              />
            </div>
            <div className='wbdv-register-input-row'>
              <label className='wbdv-register-input-label'>First name:</label>
              <input
                  className='wbdv-input wbdv-register-input'
                  onChange={(e) => this.setState({firstName: e.target.value})}
              />
            </div>
            <div className='wbdv-register-input-row'>
              <label className='wbdv-register-input-label'>Last name:</label>
              <input
                  className='wbdv-input wbdv-register-input'
                  onChange={(e) => this.setState({lastName: e.target.value})}
              />
            </div>
            <div className='wbdv-register-input-row'>
              <label className='wbdv-register-input-label'>Email:</label>
              <input
                  type='email'
                  className='wbdv-input wbdv-register-input'
                  onChange={(e) => this.setState({email: e.target.value})}
              />
            </div>
            <div className='wbdv-register-input-row'>
              <div className='wbdv-register-input-label'>Role:</div>
              <select
                  className='wbdv-input wbdv-register-input'
                  onChange={(e) => this.setState({role: e.target.value})}
              >
                <option value={'STUDENT'}>Student</option>
                <option value={'TUTOR'}>Tutor</option>
                <option value={'ADMIN'}>Admin</option>
              </select>
            </div>
          </div>
          <div className='wbdv-register-buttons'>
            <button
                className='wbdv-btn wbdv-green-btn wbdv-register-button'
                onClick={this.register}
            >
              Register
            </button>
            <Link to={'/login/'}>
              Already have an account? Log in
            </Link>
          </div>
        </div>
    )
  };

  render() {
    return isEmpty(this.props.current_user)
        ? this.registerSection()
        : this.alreadyLoggedIn();
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(Actions.setUser(user)),
  logout: () => dispatch(Actions.unsetUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);