import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CourseService from "../../services/CourseService";
import {isEmpty} from "../../utils/Utils";
import UserService from "../../services/UserService";
import EditCourseComponent from './EditCourse/EditCourseComponent';
import * as Actions from '../../store/Actions';

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
      <Link key={index} to={`/profile/${user._id}/`}>
        {user.name}
      </Link>;

  canEnrollTutor = () =>
      this.props.current_user
      && !isEmpty(this.props.current_user)
      && this.props.current_user.role === 'TUTOR'
      && !this.state.tutors.includes(this.current_user);

  enrollAsTutor = () =>
      UserService.enrollAsTutor(this.props.current_user._id)
      .then(response => {
        console.log(response);
        this.setState({tutors: [...this.state.tutors, this.props.current_user]})
      });

  canEnrollStudent = () =>
      this.props.current_user
      && !isEmpty(this.props.current_user)
      && (this.props.current_user.role === 'TUTOR'
      || this.props.current_user.role === 'STUDENT')
      && !this.state.tutors.includes(this.props.current_user)
      && !this.state.students.includes(this.props.current_user);

  enrollAsStudent = () =>
      UserService.enrollAsStudent(this.props.current_user._id)
      .then(response => {
        console.log(response);
        this.setState(
            {tutors: [...this.state.students, this.props.current_user]})
      });

  renderEventRow = (event, index) =>
      <Link key={index} to={`/events/${event._id}`}>
        <div>{event.title}</div>
        <div>`${event.startTime} to ${event.endTime}</div>
      </Link>;

  render() {
    return (
        <div>
          {!isEmpty(this.state.course) &&
          <div>
            <h2>{this.state.course.title}</h2>
            <div>
              <h5>Taught by:</h5>
              <div>
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
            />}
            {this.canEnrollTutor() &&
            <div>
              <button
                  onClick={this.enrollAsTutor}
              >
                Join as Tutor
              </button>
            </div>
            }
            {this.canEnrollStudent() &&
            <div>
              <button
                  onClick={this.enrollAsStudent}
              >
                Enroll
              </button>
            </div>
            }
            <div>
              <h6>Tutors:</h6>
              <div>
                {this.state.tutors.length === 0 ?
                    <div>This course currently has no registered tutors.</div> :
                    <div>{this.state.tutors.map(this.renderUserRow)}</div>}
              </div>
            </div>
            <div>
              <h6>Students:</h6>
              <div>
                {this.state.students.length === 0 ?
                    <div>This course currently has no registered Students.</div>
                    :
                    <div>{this.state.students.map(this.renderUserRow)}</div>}
              </div>
            </div>
          </div>}
          <div>
            <h6>Office Hours</h6>
            {this.state.events.length === 0 ?
                <div>This course has no scheduled events.</div>
                :
                <div>
                  {this.events.map(this.renderEventRow)}
                </div>}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(Actions.setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    CourseDetailComponent);