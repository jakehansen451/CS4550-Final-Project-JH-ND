import React from "react";
import {connect} from 'react-redux';
import oauth from "../../api/GoogleAPIService";
import {isEmpty} from '../../utils/Utils';
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import * as Actions from "../../store/Actions";

class LoginComponent extends React.Component {
  state = {
    register: false,
    currentUsername: '',
    currentPassword: '',
    currentConfirmPassword: '',
    currentEmail: '',
  };

  /*
  componentDidMount() {
    oauth.handleClientLoad();
  }
  */

  alreadyLoggedIn = () => {
    return (
        <div>
          <h2>
            Already logged in.
          </h2>
          <div>
            <button onClick={this.logout}>
              Log out
            </button>
          </div>
        </div>
    );
  };

  logout = () => UserService.logout()
  .then(response => this.props.logout());

  registerSection = () => {
    return (
        <div>
          <button
              onClick={this.register}
          >
            Register
          </button>
          <button
              onClick={() => this.setState({register: false})}
          >
            Already have an account? Log in
          </button>
        </div>
    )
  };

  register = () => {
    if (this.state.currentUsername
    && this.state.currentEmail
    && this.state.currentPassword
    && this.state.currentPassword === this.state.currentConfirmPassword) {
      UserService.register({
        username: this.state.currentUsername,
        password: this.state.currentPassword,
        email: this.state.currentEmail
      })
    }
  };

  loginSection = () => {
    return (
        <div>
          <button
              onClick={this.login}
          >
            Log in
          </button>
          <button
              onClick={() => this.setState({register: true})}
          >
            Need an account? Register
          </button>
        </div>
    )
  };

  login = () => UserService.login({
    username: this.state.currentUsername,
    password: this.state.currentPassword
  })
  .then(response => {
    if(response.status !== '200') {
      console.log('Error');
      console.log(response);
    } else {
      this.props.login(response);
      this.props.history.push(`/profile/${response._id}`);
    }
  });

  loginOrRegister = () => {
    return (
        <div>
          <h2>
            {this.state.register ? 'Register' : 'Log in'}
          </h2>
          <div>
            <label>Username:</label>
            <input/>
          </div>

          <div>
            <label>Password:</label>
            <input/>
          </div>
          {this.state.register &&
          <div>
            <div>
              <label>Confirm password:</label>
              <input/>
            </div>
            <div>
              <label>Email:</label>
              <input/>
            </div>
          </div>}
          {this.state.register ? this.registerSection() : this.loginSection()}
        </div>
    )
  };

  render() {
    return isEmpty(this.props.current_user)
        ? this.loginOrRegister()
        : this.alreadyLoggedIn();
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(Actions.login(user)),
  logout: () => dispatch(Actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);