import React from 'react';
import {connect} from 'react-redux';
import CourseService from "../../../services/CourseService";
import '../../../styles.css';
import './EditCourseComponent.css';

class EditCourseComponent extends React.Component {
  state = {
    courseId: this.props.courseId,
    courseName: '',
    tutors: [],
    students: [],
  };

  updateCourse = () => {
    if (this.state.courseName !== this.props.course) {
      CourseService.updateCourse(this.props.course._id,
          {
            title: this.state.courseName,
            adminId: this.props.current_user._id,
          })
      .then(updatedCourse => {
        console.log(updatedCourse);
        this.props.courseUpdated(updatedCourse)
      });
    }
  };

  render() {
    return (
        <div className='wbdv-edit-course'>
          <div className='wbdv-edit-course-row'>
            <label className='wbdv-edit-course-label'>
              Change Course Title:
            </label>
            <input
                className='wbdv-input'
                onChange={(e) => this.setState({courseName: e.target.value})}
            />
          </div>
          <div className='wbdv-edit-course-buttons'>
            <button
                className='wbdv-btn wbdv-green-btn wbdv-edit-course-btn'
                onClick={this.updateCourse}
            >
              Update Course
            </button>
            <button
                className='wbdv-btn wbdv-red-btn wbdv-edit-course-btn'
                onClick={this.props.deleteCourse}
            >
              Delete Course
            </button>
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
    EditCourseComponent);