import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CourseService from '../../services/CourseService';
import * as Actions from '../../store/Actions';

class CourseBrowserComponent extends React.Component {
  state = {
    courses: [],
    newCourseTitle: 'New Course',
  };

  componentDidMount() {
    CourseService.getAllCourses()
    .then(courses => {
      console.log(courses);
      this.setState({courses})
    })
  }

  renderCourseRow = (course, index) => {
    return (
        <div key={index}>
          <Link to={`/courses/${course._id}`}>{course.title}</Link>
          <div>{`${course.admin.lastName}, ${course.admin.firstName}`}</div>
          <div>
            <button>
              Enroll
            </button>
          </div>
        </div>
    )
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
    CourseBrowserComponent);