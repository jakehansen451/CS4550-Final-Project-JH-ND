import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class CourseDetailComponent extends React.Component {
  state ={
    course: this.props.courses.find(course =>
        course._id === this.props.match.params.courseId),
  };

  render() {
    return (
        <div>
          <h2>{this.state.course.title}</h2>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailComponent);