import React from "react"
import { connect } from 'react-redux'
import * as Actions from '../../store/Actions'
import './SearchComponent.css'

const fakeUsers = [
  {
    _id: '0',
    username: 'hansen.j',
    password: 'password',
    firstName: 'Jake',
    lastName: 'Hansen',
    email: 'hansen.j@husky.neu.edu',
    phone: '503-348-4863',
    role: 'admin',
    roleData: {
      coursesTutor: ['CS2500'],
      officeHours: []
    }
  },
  {
    _id: '1',
    username: 'damrina.n',
    password: 'password',
    firstName: 'Nadiia',
    lastName: 'Damrina',
    email: 'damrina.n@husky.neu.edu',
    phone: '',
    role: 'tutor',
    roleData: {
      coursesTutor: ['CS2500'],
      coursesEnrolled: ['CS4550'],
      officeHours: []
    }
  },
  {
    _id: '2',
    username: 'annunziato.j',
    password: 'password',
    firstName: 'Jose',
    lastName: 'Annunziato',
    email: 'annunziato.j@northeastern.edu',
    phone: '',
    role: 'student',
    roleData: {
      coursesEnrolled: ['CS2500']
    }
  },
];

class SearchComponent extends React.Component {
  state = {
    admin: fakeUsers.filter((user) => user.role === 'admin'),
    tutors: fakeUsers.filter((user) => user.role === 'tutor'),
    students: fakeUsers.filter((user) => user.role === 'student'),
  };

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
            {this.state.admin.map((admin) => this.renderUser(admin))}
          </div>
          <div className='wbdv-user-column'>
            <h4>Tutors</h4>
            {this.state.tutors.map((tutor) => this.renderUser(tutor))}
          </div>
          <div className='wbdv-user-column'>
            <h4>Students</h4>
            {this.state.students.map((student) => this.renderUser(student))}
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  selected_users: state.selected_users
});

const mapDispatchToProps = (dispatch) => ({
  selectUser: (user) => dispatch(Actions.selectUser(user)),
  deselectUser: (user) => dispatch(Actions.deselectUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
