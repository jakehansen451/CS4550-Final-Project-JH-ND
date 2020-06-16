import React from "react";
import {connect} from 'react-redux';
import {isEmpty} from '../../utils/Utils';
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import * as Actions from "../../store/Actions";

class LoginComponent extends React.Component {
  state = {
    username: '',
    password: '',
  };

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

  login = () => UserService.login({
    username: this.state.username,
    password: this.state.password
  })
  .then(response => {
    if (response.status == '500') {
      console.log('Error');
      console.log(response);
    } else {
      this.props.login(response);
      this.props.history.push(`/profile/${response._id}/`);
    }
  });

  loginSection = () => {
    return (
        <div>
          <h2>Log in</h2>
          <div>
            <label>Username:</label>
            <input/>
          </div>

          <div>
            <label>Password:</label>
            <input/>
          </div>
          <div>
            <button
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
  login: (user) => dispatch(Actions.login(user)),
  logout: () => dispatch(Actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);