import React from 'react';
import {connect} from 'react-redux';
import UserService from "../../services/UserService";

class ProfileComponent extends React.Component {

  render() {
    const userId =this.props.match.params.userId;
    const user = UserService.getUser(userId);


    return (
        <div>
          <h2>Profile</h2>
        </div>
    )}
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);