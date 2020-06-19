import React from "react"
import {connect} from 'react-redux'
import * as Actions from '../../store/Actions'
import {Link} from 'react-router-dom'
import './SearchComponent.css'
import UserService from "../../services/UserService";
import CourseService from "../../services/CourseService";
import {isEmpty} from "../../utils/Utils";

class SearchComponent extends React.Component {
  state = {
    courseId: this.props.match.params.courseId,
    admin: {},
    tutors: [],
    students: [],
  };

  componentDidMount() {
    UserService.getSession()
    .then(response => response && this.props.setUser(response));

    CourseService.getCourse(this.state.courseId)
    .then(course => this.setState({admin: course.admin}));

    UserService.getTutorsForCourse(this.state.courseId)
    .then(tutors => this.setState({tutors}));

    UserService.getStudentsForCourse(this.state.courseId)
    .then(students => this.setState({students}));

    this.props.clearUsers();
  }

  componentDidUpdate() {
    if (isEmpty(this.props.current_user)) {
      console.log(this.props);
      this.props.history.push('/');
    }
  }

  renderUser = (user) => {
    const userSelected = this.props.selected_users.includes(user);
    return (
        <div
            className={userSelected
                ? 'wbdv-user-row wbdv-selected-user'
                : 'wbdv-user-row'}
            key={user._id}
            onClick={() => {
              if (!userSelected) {
                this.props.selectUser(user);
              }
              else {
                this.props.deselectUser(user);
              }
            }}
        >
          {user.lastName.concat(', ', user.firstName)}
        </div>
    )
  };

  determineValidSearch = () => {
    for (const user of this.props.selected_users) {
      if (user.role === 'ADMIN') {
        return true;
      }
      for (const tutor of this.state.tutors) {
        if (tutor._id === user._id) {
          return true;
        }
      }
    }
    return false;
  };

  buildSearchUrl = () => {
    return '/results/'.concat(`${this.state.courseId}/`,
        this.props.selected_users.map(user => user._id).join(','));
  };

  render() {
    return (
        <div>
          <h1>Search</h1>
          <div className='wbdv-three-column-container'>
            <div className='wbdv-user-column'>
              <h4>Course Admin</h4>
              <div className='wbdv-scroll-column'>
                {!isEmpty(this.state.admin) && this.renderUser(
                    this.state.admin)}
              </div>
            </div>
            <div className='wbdv-user-column'>
              <h4>Tutors</h4>
              <div className='wbdv-scroll-column'>
                {this.state.tutors.map((tutor) => this.renderUser(tutor))}
              </div>
            </div>
            <div className='wbdv-user-column'>
              <h4>Students</h4>
              <div className='wbdv-scroll-column'>
                {this.state.students.map(
                    (student) => this.renderUser(student))}
              </div>
            </div>
          </div>
          <div className='wbdv-search-btn-chunk'>
            <h4>
              {this.determineValidSearch()
                  ? <Link
                      className='wbdv-search-btn'
                      to={this.buildSearchUrl()}
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
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  selectUser: (user) => dispatch(Actions.selectUser(user)),
  deselectUser: (user) => dispatch(Actions.deselectUser(user)),
  setUser: (user) => dispatch(Actions.setUser(user)),
  clearUsers: () => dispatch(Actions.setSelectedUsers([])),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
