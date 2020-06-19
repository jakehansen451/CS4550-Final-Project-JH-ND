import React from "react";
import {connect} from 'react-redux';
import {isEmpty} from '../../utils/Utils';
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import * as Actions from "../../store/Actions";
import '../../styles.css';
import './LoginComponent.css';
import NavigatorComponent from "../Navigator/NavigatorComponent";

class LoginComponent extends React.Component {
  state = {
    username: '',
    password: '',
  };

  componentDidMount() {
    UserService.getSession()
    .then(response => {
      if (!response) {
        this.props.logout();
      } else {
        this.props.login(response);
      }
    });
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

  logout = () => {
      UserService.logout()
          .then(response => this.props.logout());
  };


  login = () => UserService.login({
    username: this.state.username,
    password: this.state.password
  })
  .then(response => {
    if (response) {
      this.props.login(response);
      this.props.history.push(`/profile/${response._id}/`);
    } else {
      alert('Invalid username or password');
    }
  });

  loginSection = () => {
    return (
        <div className='wbdv-login'>
          <NavigatorComponent currentPage={this.props.history.location.pathname}/>
          <h2>Log in</h2>
          <div>
            <div className='wbdv-login-input-row'>
              <label className='wbdv-login-input-label'>Username:</label>
              <input
                  className='wbdv-input wbdv-login-input'
                  onChange={(e) => this.setState({username: e.target.value})}
              />
            </div>
            <div className='wbdv-login-input-row'>
              <label className='wbdv-login-input-label'>Password:</label>
              <input
                  className='wbdv-input wbdv-login-input'
                  type={'password'}
                  onChange={(e) => this.setState({password: e.target.value})}
              />
            </div>
          </div>
          <div className='wbdv-login-buttons'>
            <button
                className='wbdv-btn wbdv-green-btn wbdv-login-button'
                onClick={this.login}
            >
              Log in
            </button>
            <Link to={'/register/'}>
              Need an account? Register
            </Link>
          </div>
        </div>
    )
  };

  render() {
    return isEmpty(this.props.current_user)
        ? this.loginSection()
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);