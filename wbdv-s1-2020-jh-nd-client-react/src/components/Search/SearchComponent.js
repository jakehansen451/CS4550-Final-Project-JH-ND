import React from "react"
import { connect } from 'react-redux'
import * as Actions from '../../store/Actions'
import { Link } from 'react-router-dom'
import './SearchComponent.css'

class SearchComponent extends React.Component {
  admin = this.props.users.filter((user) => user.role === 'ADMIN');
  tutors = this.props.users.filter((user) => user.role === 'TUTOR');
  students = this.props.users.filter((user) => user.role === 'STUDENT');

  renderUser = (user) => {
    const userSelected = this.props.selected_users.includes(user);
    return (
        <div
            className={userSelected
                ? 'wbdv-user-row wbdv-selected-user'
                : 'wbdv-user-row'}
            key={user._id}
            onClick={() => {
              if (!userSelected) { this.props.selectUser(user); }
              else { this.props.deselectUser(user); }
            }}
        >
          {user.lastName.concat(', ', user.firstName)}
        </div>
    )
  };

  render() {
    return(
      <div>
        <h1>Search</h1>
        <div className='wbdv-three-column-container'>
          <div className='wbdv-user-column'>
            <h4>Course Administrators</h4>
            <div className='wbdv-scroll-column'>
              {this.admin.map((admin) => this.renderUser(admin))}
            </div>
          </div>
          <div className='wbdv-user-column'>
            <h4>Tutors</h4>
            <div className='wbdv-scroll-column'>
              {this.tutors.map((tutor) => this.renderUser(tutor))}
            </div>
          </div>
          <div className='wbdv-user-column'>
            <h4>Students</h4>
            <div className='wbdv-scroll-column'>
              {this.students.map((student) => this.renderUser(student))}
            </div>
          </div>
        </div>
        <div className='wbdv-search-btn-chunk'>
          <h4>
            {this.props.selected_users.length !== 0
                ? <Link
                    className='wbdv-search-btn'
                    to='/results'
                >
                  Search Calendars
                </Link>
                : 'Search Calendars'
            }
          </h4>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  users: state.users,
  selected_users: state.selected_users,
});

const mapDispatchToProps = (dispatch) => ({
  selectUser: (user) => dispatch(Actions.selectUser(user)),
  deselectUser: (user) => dispatch(Actions.deselectUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
