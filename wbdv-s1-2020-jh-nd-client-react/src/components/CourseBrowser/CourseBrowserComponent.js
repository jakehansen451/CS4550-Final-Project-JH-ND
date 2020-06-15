import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class CourseBrowserComponent extends React.Component {
  renderCourseRow = (course, index) => {
    return (
        <div key={index}>
          <Link to={`/courses/${course._id}`}>{course.title}</Link>
          <div>
            <button>
              Enroll
            </button>
          </div>
        </div>
    )
  };

  render() {
    console.log(this.props);
    return (
        <div>
          <h2>Browse Courses</h2>
          <div>
            {this.props.courses.map(this.renderCourseRow)}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseBrowserComponent);