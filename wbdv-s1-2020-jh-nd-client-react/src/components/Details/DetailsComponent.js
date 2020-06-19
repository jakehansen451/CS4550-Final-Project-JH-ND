import React from 'react'
import {connect} from 'react-redux'
import * as Actions from "../../store/Actions";
import * as DateUtils from '../../utils/DateUtils'
import {isEmpty} from "../../utils/Utils";
import UserService from "../../services/UserService";
import CourseService from "../../services/CourseService";
import EventService from "../../services/EventService";

import './DetailsComponent.css'

class DetailsComponent extends React.Component {
  state = {
    courseId: this.props.match.params.courseId,
    title: '',
    users: [],
    hostOptions: [],
    hostId: '',
    start: this.props.match.params.startTime,
    end: this.props.match.params.endTime,
  };

  componentDidUpdate() {
    if (isEmpty(this.props.current_user)) {
      console.log(this.props);
      this.props.history.push('/');
    }

    if (this.state.users.length === 0 && this.props.selected_users.length > 0) {
      for (const user of this.props.selected_users) {
        UserService.getUser(user._id)
        .then(u => {
              if (!this.state.users.find(t => t._id === u._id)) {
                this.setState({users: [...this.state.users, u]});
                if (u.role === 'ADMIN' || u.role === 'TUTOR') {
                  this.setState({hostOptions: [...this.state.hostOptions, u]});
                  !this.state.hostId && this.setState({hostId: u._id});
                }
              }
            }
        )
      }
    }
  }

  renderHostOption = (user, index) => {
    return (
        <option value={user._id} key={index}>
          {`${user.lastName}, ${user.firstName}`}
        </option>
    )
  };

  createEvent = () => {
    if (this.state.title) {

      EventService.createEvent(
          this.state.start,
          this.state.end,
          this.state.title,
          this.state.courseId,
          this.state.hostId,
          this.state.users.map(u => u._id).join(',')
      ).then(event => this.props.history.push(`/events/${event._id}`));


    } else {
      alert('Event title cannot be empty');
    }
  };

  render() {
    const startDate = new Date(this.state.start);
    const splitArr = startDate.toLocaleDateString().split('/');
    const date = [splitArr[2], splitArr[0].padStart(2, '0'),
      splitArr[1].padStart(2, '0')].join('-');

    const startLocal = startDate.toLocaleTimeString('en-GB');
    const endLocal = new Date(this.state.end).toLocaleTimeString('en-GB');

    return (
        <div>
          <h1>Event Details</h1>
          <div>
            <div>
              <form className='wbdv-details-form'>
                <div className='wbdv-details-form-row'>
                  <h6>Title:</h6>
                  <input
                      type='text'
                      value={this.state.title}
                      onChange={(e) => this.setState({title: e.target.value})}
                  />
                </div>
                <div className='wbdv-details-form-row'>
                  <h6>Date:</h6>
                  <input
                      type='date'
                      value={date}
                      onChange={(event) => this.props.selectTime({
                        ...this.props.selected_time_block,
                        date: event.target.value,
                      })}
                  />
                </div>
                <div className='wbdv-details-form-row'>
                  <h6>Start:</h6>
                  <input
                      type='time'
                      value={startLocal}
                      onChange={(event) => this.props.selectTime({
                        ...this.props.selected_time_block,
                        start: DateUtils.UTCFromLocalTime(date,
                            event.target.value),
                      })}
                  />
                </div>
                <div className='wbdv-details-form-row'>
                  <h6>End:</h6>
                  <input
                      type='time'
                      value={endLocal}
                      onChange={(event) => this.props.selectTime({
                        ...this.props.selected_time_block,
                        end: DateUtils.UTCFromLocalTime(date,
                            event.target.value),
                      })}
                  />
                </div>
                <div className='wbdv-details-form-row'>
                  <h6>Host:</h6>
                  <select>
                    {this.state.hostOptions.map(this.renderHostOption)}
                  </select>
                </div>
              </form>
              <button
                  className='wbdv-btn wbdv-schedule-meeting-btn'
                  onClick={this.createEvent}
              >
                <h4>Schedule Meeting</h4>
              </button>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
  selected_users: state.selected_users,
  selected_time_block: state.selected_time_block,
});

const mapDispatchToProps = (dispatch) => ({
  selectTime: (time_block) => dispatch(Actions.selectTime(time_block))
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsComponent);