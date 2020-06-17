import React from 'react';
import {connect} from 'react-redux';
import CourseService from "../../../services/CourseService";

class EditCourseComponent extends React.Component {
  state = {
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
        <div>
          <div>
            <label>Change Course Title:</label>
            <input
                onChange={(e) => this.setState({courseName: e.target.value})}
            />
          </div>
          <div>
            <button onClick={this.updateCourse}>
              Update Course
            </button>
            <button>
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