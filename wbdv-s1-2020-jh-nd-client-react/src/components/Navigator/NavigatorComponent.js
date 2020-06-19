import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {isEmpty} from "../../utils/Utils";
import '../../styles.css';
import './NavigatorComponent.css';

class NavigatorComponent extends React.Component {
  render() {
    return (
        <div className='wbdv-navigator'>
          {this.props.currentPage === '/' && isEmpty(this.props.current_user)
          &&
              <span>
                <Link className='wbdv-navigator-link' to={`/login`}> Login </Link>
                <Link className='wbdv-navigator-link' to={`/register`}> Register </Link>
              </span>
         }

          {this.props.currentPage !== '/' &&
          <Link className='wbdv-navigator-link' to={'/'}>
            Home
          </Link>}

          {(!isEmpty(this.props.current_user) &&
              !this.props.currentPage.startsWith('/profile/')) &&
          <Link className='wbdv-navigator-link'
                to={`/profile/${this.props.current_user._id}/`}
          >
            Profile
          </Link>}
          {this.props.currentPage !== '/courses/' &&
          <Link className='wbdv-navigator-link' to={'/courses/'}>
            Courses
          </Link>}
        </div>
    )
  }
};

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

export default connect(mapStateToProps, null)(NavigatorComponent);