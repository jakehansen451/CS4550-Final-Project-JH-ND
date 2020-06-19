import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CourseService from "../../services/CourseService";
import {isEmpty} from "../../utils/Utils";
import UserService from "../../services/UserService";
import EditCourseComponent from './EditCourse/EditCourseComponent';
import * as Actions from '../../store/Actions';
import NavigatorComponent from "../Navigator/NavigatorComponent";
import '../../styles.css';
import './CourseDetailComponent.css';

class CourseDetailComponent extends React.Component {
  state = {
    courseId: this.props.match.params.courseId,
    course: {},
    tutors: [],
    students: [],
    events: [],
    newCourseTitle: '',
  };

  componentDidMount() {
    UserService.getSession()
    .then(response => response && this.props.setUser(response));

    CourseService.getCourse(this.state.courseId)
    .then(course => this.setState({course}));

    UserService.getTutorsForCourse(this.state.courseId)
    .then(tutors => this.setState({tutors}));

    UserService.getStudentsForCourse(this.state.courseId)
    .then(students => this.setState({students}));

    CourseService.getEventsForCourse(this.state.courseId)
    .then(events => this.setState({events}));
  }

  renderUserRow = (user, index) =>
      <div key={index} className='wbdv-detail-user-row'>
        <Link to={`/profile/${user._id}/`}>
          {`${user.lastName}, ${user.firstName}`}
        </Link>
      </div>;

  canEnrollTutor = () =>
      this.props.current_user
      && !isEmpty(this.props.current_user)
      && this.props.current_user.role === 'TUTOR'
      && !this.state.tutors.find(t => t._id === this.props.current_user._id)
      && !this.state.students.find(s => s._id === this.props.current_user._id);

  enrollAsTutor = () =>
      CourseService.addTutor(this.state.courseId, this.props.current_user)
      .then(course => this.setState({
        course,
        tutors: [...this.state.tutors, this.props.current_user]
      }));

  quitAsTutor = () =>
      CourseService.removeTutor(this.state.courseId, this.props.current_user)
      .then(course => this.setState({
        course,
        tutors: this.state.tutors.filter(
            t => t._id !== this.props.current_user._id)
      }));

  canEnrollStudent = () =>
      this.props.current_user
      && !isEmpty(this.props.current_user)
      && (this.props.current_user.role === 'TUTOR'
      || this.props.current_user.role === 'STUDENT')
      && !this.state.tutors.find(t => t._id === this.props.current_user._id)
      && !this.state.students.find(s => s._id === this.props.current_user._id);

  enrollAsStudent = () =>
      CourseService.addStudent(this.state.courseId, this.props.current_user)
      .then(course => this.setState({
        course,
        students: [...this.state.students, this.props.current_user]
      }));

  quitAsStudent = () =>
      CourseService.removeStudent(this.state.courseId, this.props.current_user)
      .then(course => this.setState({
        course,
        students: this.state.students.filter(
            s => s._id !== this.props.current_user._id)
      }));

  renderEventRow = (event, index) => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    return (
        <div key={index} className='wbdv-render-event-row'>
          <Link to={`/events/${event._id}`}>{event.title}</Link>
          <div>{start.toLocaleDateString()}</div>
          <div>{`${start.toLocaleTimeString()} to ${end.toLocaleTimeString()}`}</div>
        </div>
    )
  };

  deleteCourse = () => {
    CourseService.deleteCourse(this.state.courseId)
    .then(response => {
      this.props.history.push('/courses/');
    });
  };

  render() {
    return (
        <div className='wbdv-course-detail'>
          <NavigatorComponent
              currentPage={this.props.history.location.pathname}/>
          {!isEmpty(this.state.course) &&
          <div>
            <h2>{this.state.course.title}</h2>
            <div className='wbdv-admin-row'>
              <h5>Taught by:</h5>
              <div className='wbdv-taught-by'>
                {`${this.state.course.admin.firstName} ${this.state.course.admin.lastName}`}
              </div>
            </div>
            {(!isEmpty(this.props.current_user) && !isEmpty(this.state.course)
                &&
                this.props.current_user._id === this.state.course.admin._id)
            &&
            <EditCourseComponent
                course={this.state.course}
                courseUpdated={(course) => this.setState({course})}
                deleteCourse={this.deleteCourse}
            />}
            {!isEmpty(this.props.current_user) &&
            <div className='wbdv-enroll-unenroll-row'>
              {this.canEnrollStudent() &&
              <div>
                <button
                    className='wbdv-btn wbdv-green-btn wbdv-enroll-section-btn wbdv-enroll-btn'
                    onClick={this.enrollAsStudent}
                >
                  Enroll
                </button>
              </div>}
              {this.state.students.find(
                  s => s._id === this.props.current_user._id) &&
              <div>
                <button
                    className='wbdv-btn wbdv-red-btn wbdv-enroll-section-btn'
                    onClick={this.quitAsStudent}
                >
                  Unenroll
                </button>
              </div>}
              {this.canEnrollTutor() &&
              <div>
                <button
                    className='wbdv-btn wbdv-green-btn wbdv-enroll-section-btn'
                    onClick={this.enrollAsTutor}
                >
                  Join as Tutor
                </button>
              </div>}
              {this.state.tutors.find(
                  t => t._id === this.props.current_user._id) &&
              <div>
                <button
                    className='wbdv-btn wbdv-red-btn wbdv-enroll-section-btn'
                    onClick={this.quitAsTutor}
                >
                  Leave as Tutor
                </button>
              </div>}
            </div>}
            <div className='wbdv-course-two-column'>
              <div className='wbdv-student-column'>
                <h6>Students:</h6>
                <div className='wbdv-student-list'>
                  {this.state.students.length === 0 ?
                      <div>This course currently has no registered
                        Students.</div>
                      :
                      <div>{this.state.students.map(this.renderUserRow)}</div>}
                </div>
              </div>
              <div className='wbdv-tutor-column'>
                <h6>Tutors:</h6>
                <div className='wbdv-tutor-list'>
                  {this.state.tutors.length === 0 ?
                      <div>This course currently has no registered tutors.</div>
                      :
                      <div>{this.state.tutors.map(this.renderUserRow)}</div>}
                </div>
              </div>
            </div>
            {!isEmpty(this.props.current_user) &&
            <div className='wbdv-events-list'>
              <h6>Office Hours</h6>
              <div>
                {!isEmpty(this.props.current_user) &&
                <button
                    className='wbdv-btn wbdv-green-btn wbdv-schedule-events-btn'
                    onClick={() => this.props.history.push(
                        `/search/${this.state.courseId}/`)}
                >
                  Schedule Events
                </button>}
              </div>
              <div>
                {this.state.events.length === 0 ?
                    <div>This course has no scheduled events.</div>
                    :
                    <div>
                      {this.state.events.map(this.renderEventRow)}
                    </div>}
              </div>
            </div>}
          </div>}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(Actions.setUser(user)),
  selectUser: (user) => dispatch(Actions.selectUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    CourseDetailComponent);