import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CourseService from '../../services/CourseService';
import * as Actions from '../../store/Actions';
import UserService from "../../services/UserService";
import '../../styles.css';
import './CourseBrowserComponent.css';
import NavigatorComponent from "../Navigator/NavigatorComponent";

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
        <div key={index} className='wbdv-course-table-row'>
          <div className='wbdv-course-row-contents'>
            <Link to={`/courses/${course._id}`}>{course.title}</Link>
            <Link to={`/profile/${course.admin._id}`}>
              {`${course.admin.lastName}, ${course.admin.firstName}`}
            </Link>
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
        <div className='wbdv-course-browser'>
          <NavigatorComponent
              currentPage={this.props.history.location.pathname}/>
          <h2>Browse Courses</h2>
          {this.props.current_user.role === 'ADMIN' &&
          <div className='wbdv-add-course-block'>
            <label
                className='wbdv-new-course-label'
                htmlFor={'new-course-title'}
            >
              New Course Title:
            </label>
            <div>
              <input
                  className='wbdv-input wbdv-new-course-input'
                  defaultValue={this.state.newCourseTitle}
                  onChange={(e) => this.setState(
                      {newCourseTitle: e.target.value})}
              />
              <button
                  className='wbdv-btn wbdv-green-btn'
                  onClick={this.addCourse}
              >
                Add Course
              </button>
            </div>
          </div>}
          <div className='wbdv-course-table'>
            <div className='wbdv-course-table-row'>
              <div className='wbdv-course-row-contents'>
                <div>Course Title</div>
                <div>Administrator</div>
              </div>
            </div>
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