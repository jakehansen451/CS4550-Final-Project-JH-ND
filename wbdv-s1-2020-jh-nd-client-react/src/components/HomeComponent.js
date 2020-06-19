import React from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import UserService from "../services/UserService";
import * as Actions from "../store/Actions";
import {isEmpty} from "../utils/Utils";
import NavigatorComponent from "./Navigator/NavigatorComponent";
import "../styles.css";
import "./HomeComponent.css";

class HomeComponent extends React.Component {
  componentDidMount() {
    UserService.getSession()
    .then(response => response && this.props.login(response));
  }

    logout = () => {
        UserService.logout()
            .then(r => {
                this.props.unsetUser();
                this.props.history.push('/');
            })
    };

  render() {
    return (
        <div>
          <div className="content">
            <NavigatorComponent  currentPage={this.props.history.location.pathname}>
              <div className="list-group">
                <Link className="list-group-item" to='/login/'>
                  Login or register
                </Link>
                {!isEmpty(this.props.current_user) &&
                <Link className='list-group-item'
                      to={`/profile/${this.props.current_user._id}/`}
                >
                  Profile
                </Link>}
                <Link className='list-group-item' to='/courses/'>
                  Browse courses
                </Link>
              </div>
            </NavigatorComponent>

            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Welcome{isEmpty(this.props.current_user) ? null : ` back, ${this.props.current_user.firstName}!`}</h1>

                <p className="lead">This website helps tutors, faculty and students to find best time to meet in the online format regardless of their timezones.</p>


                <hr className="my-4"/>
                  {!isEmpty(this.props.current_user) &&
                  <p>
                      <a className="btn" role="button" onClick={this.logout}>Log out</a>
                  </p>}
              </div>
            </div>
          </div>


          <div className="footer navbar-fixed-bottom">
          <footer id="sticky-footer" className="py-4 bg-light text-white-50">
            <div className="container text-center">
              <small className="text-muted">This website was sponsored by coffee</small>
            </div>
          </footer>
          </div>
        </div>

    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(Actions.setUser(user)),
    unsetUser: () => dispatch(Actions.unsetUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
