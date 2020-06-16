import React from "react";
import {connect} from 'react-redux';
import {isEmpty} from '../../utils/Utils';
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import * as Actions from "../../store/Actions";

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
  .then(response => {console.log(response); this.props.logout()});

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
      .then(newUser => {this.props.login(newUser)})
    }
  };

  login = () => UserService.login({
    username: this.state.username,
    password: this.state.password
  })
  .then(response => {
    if (response.status !== '200') {
      console.log('Error');
      console.log(response);
    } else {
      this.props.login(response);
      this.props.history.push(`/profile/${response._id}`);
    }
  });

  registerSection = () => {
    return (
        <div>
          <h2>Register</h2>
          <div>
            <label>Username:</label>
            <input onChange={(e) => this.setState({username: e.target.value})}/>
          </div>

          <div>
            <label>Password:</label>
            <input onChange={(e) => this.setState({password: e.target.value})}/>
          </div>
          <div>
            <div>
              <label>Confirm password:</label>
              <input onChange={(e) => this.setState({confirmPassword: e.target.value})}/>
            </div>
            <div>
              <label>First name:</label>
              <input onChange={(e) => this.setState({firstName: e.target.value})}/>
            </div>
            <div>
              <label>Last name:</label>
              <input onChange={(e) => this.setState({lastName: e.target.value})}/>
            </div>
            <div>
              <label>Email:</label>
              <input onChange={(e) => this.setState({email: e.target.value})}/>
            </div>
            <div>
              <div>Role:</div>
              <select onChange={(e) => this.setState({role: e.target.value})}>
                <option value={'STUDENT'}>Student</option>
                <option value={'TUTOR'}>Tutor</option>
                <option value={'ADMIN'}>Admin</option>
              </select>
            </div>
          </div>
          <div>
            <button onClick={this.register}>
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
  login: (user) => dispatch(Actions.login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);