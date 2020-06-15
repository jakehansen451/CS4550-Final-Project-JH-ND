import React from 'react';
import {connect} from 'react-redux';

class EditProfileComponent extends React.Component {
  render() {
    return (
        <form>
          <div>
            <label>Username:</label>
            <input/>
          </div>
          <div>
            <label>Password:</label>
            <input/>
          </div>
          <div>
            <label>First name:</label>
            <input/>
          </div>
          <div>
            <label>Last name:</label>
            <input/>
          </div>
          <div>
            <label>Email:</label>
            <input/>
          </div>
        </form>
    )
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileComponent);