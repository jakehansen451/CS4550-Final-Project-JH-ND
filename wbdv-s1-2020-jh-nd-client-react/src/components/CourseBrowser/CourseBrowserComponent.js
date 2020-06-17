import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CourseService from '../../services/CourseService';
import * as Actions from '../../store/Actions';
import {isEmpty} from "../../utils/Utils";
import UserService from "../../services/UserService";

class CourseBrowserComponent extends React.Component {
  state = {
    courses: [],
    newCourseTitle: 'New Course',
  };

  componentDidMount() {
    UserService.getSession()
    .then(response => response && this.props.setUser(response));

    CourseService.getAllCourses()
    .then(courses => this.setState({courses}))
  }

  renderCourseRow = (course, index) => {
    return (
        <div key={index}>
          <Link to={`/courses/${course._id}`}>{course.title}</Link>
          <div>{`${course.admin.lastName}, ${course.admin.firstName}`}</div>
        </div>
    )
  };

  enrollStudentInCourse = (course) => {

  };

  addCourse = () => {
    CourseService.createCourse({
      title: this.state.newCourseTitle,
      adminId: this.props.current_user._id,
    }).then(newCourse => this.setState(
        {courses: [...this.state.courses, newCourse]}));
  };

  render() {
    return (
        <div>
          <h2>Browse Courses</h2>
          {this.props.current_user.role === 'ADMIN' &&
          <div>
            <label htmlFor={'new-course-title'}>New Course Title:</label>
            <input
                defaultValue={this.state.newCourseTitle}
                onChange={(e) => this.setState(
                    {newCourseTitle: e.target.value})}
            />
            <button
                onClick={this.addCourse}
            >
              Add Course
            </button>
          </div>}
          <div>
            {this.state.courses.map(this.renderCourseRow)}
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
    CourseBrowserComponent);