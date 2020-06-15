import React from "react";
import {connect} from 'react-redux';
import oauth from "../../api/GoogleAPIService";
import {isEmpty} from '../../utils/Utils';
import {Link} from "react-router-dom";

class LoginComponent extends React.Component {
  state = {
    register: false,
  };

  componentDidMount() {
    oauth.handleClientLoad();
  }

  alreadyLoggedIn = () => {
    let gSignedIn = oauth.isUserSignedIn();
    if (!gSignedIn) {
      oauth.signIn();
    }
    return (
        <div>
          <h2>
            Already logged in.
          </h2>
          <div>
            <button>
              Log out
            </button>
          </div>
        </div>
    );
  };

  registerSection = () => {
    return (
        <div>
          <Link to='/profile'>
            Register
          </Link>
          <button
              onClick={() => this.setState({register: false})}
          >
            Already have an account? Log in
          </button>
        </div>
    )
  };

  loginSection = () => {
    return (
        <div>
          <Link to='/profile'>
            Log in
          </Link>
          <button
              onClick={() => this.setState({register: true})}
          >
            Need an account? Register
          </button>
        </div>
    )
  };

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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);