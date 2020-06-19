import React from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import UserService from "../services/UserService";
import * as Actions from "../store/Actions";
import {isEmpty} from "../utils/Utils";
import NavigatorComponent from "./Navigator/NavigatorComponent";

class HomeComponent extends React.Component {
  componentDidMount() {
    UserService.getSession()
    .then(response => response && this.props.login(response));
  }

  render() {
    return (
        <NavigatorComponent>
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
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(Actions.setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
