import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as Actions from "../../store/Actions";
import * as Utils from '../../utils/Utils'
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import {isEmpty} from "../../utils/Utils";
import EventService from "../../services/EventService";
import moment from 'moment';

import './ResultsComponent.css'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday',
  'Saturday'];

class ResultsComponent extends React.Component {
  parseTimeBlocks = (datetimeArray) => {
    let inputArr = [...datetimeArray];
    const outputArray = [];

    const midnight = new Date();
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);
    let midnightStr = midnight.toISOString();

    for (let i = 0; i < 7; i++) {
      for (const datetime of inputArr) {
        const startDT = new Date(datetime.start);
        const endDT = new Date(datetime.end);

        if (endDT - startDT < 30 * 60 * 1000) {
          inputArr = inputArr.filter(d => d !== datetime);
        }

        else if (midnightStr - startDT < 30 * 60 * 1000) {
          inputArr = inputArr.filter(d => d !== datetime);
          inputArr.push({start: midnightStr, end: datetime.end});
        }

        else if (midnight - startDT > 0 && endDT - midnight >= 0) {
          outputArray.push({start: datetime.start, end: midnightStr});
          inputArr = inputArr.filter(d => d !== datetime);
          inputArr.push({start: midnightStr, end: datetime.end});
        }

        else if (midnight - endDT > 0) {
          outputArray.push(datetime);
          inputArr = inputArr.filter(d => d !== datetime);
        }
      }

      midnight.setDate(midnight.getDate() + 1);
      midnightStr = midnight.toISOString();
    }
    return outputArray;
  };

  state = {
    courseId: this.props.match.params.courseId,
    userIds: this.props.match.params.userIds.split(','),
    free_time_blocks: [],
    display: 'list',
  };

  componentDidMount() {
    const now = new Date();
    const weekLater = new Date();
    weekLater.setDate(now.getDate() + 7);
    EventService.getFreeTimesForUsers(
        this.state.userIds.join(','),
        now.toISOString(),
        weekLater.toISOString()
    ).then(r => {
      this.setState({
        free_time_blocks: this.parseTimeBlocks(
            r.map(dt => ({start: dt.startString, end: dt.endString})))
      })
    });
  }

  componentDidUpdate() {
    if (isEmpty(this.props.current_user)) {
      this.props.history.push('/');
    }
  }

  renderFreeTimeBlock = (timeSlot, index) => {
    const start_datetime = new Date(timeSlot.start);
    const end_datetime = new Date(timeSlot.end);
    return (
        <div
            className={this.props.selected_time_block === timeSlot
                ? 'wbdv-time-slot-row wbdv-selected-time'
                : 'wbdv-time-slot-row'}
            key={index}
            onClick={() => this.props.selectTime(timeSlot)}
        >
          <div className='wbdv-time-slot-day'>
            {days[start_datetime.getDay()]}
          </div>
          <div className='wbdv-time-slot-start'>
            {start_datetime.toLocaleTimeString().replace(/(?<=:.{2}):.{2}/, '')}
          </div>
          <div className='wbdv-time-slot-end'>
            {end_datetime.toLocaleTimeString().replace(/(?<=:.{2}):.{2}/, '')}
          </div>
        </div>
    )
  };

  renderUser = (user) =>
      <div className='wbdv-user-row' key={user._id}>
        {user.lastName.concat(', ', user.firstName)}
      </div>;

  sendInterval = (interval) => this.props.history.push(
      this.generateDetailsUrl(interval.start.toISOString(),
          interval.end.toISOString()));

  generateDetailsUrl = (start,
      end) => `/details/${this.state.courseId}/`.concat(
      `${this.props.selected_users.map(user => user._id).join(',')}/`,
      `${start}/`, `${end}`);

  render() {
    return (
        <div className='wbdv-results'>
          <div className='wbdv-results-page-title-bar'>
            <h1>Results</h1>
          </div>
          <div className='wbdv-time-select-body'>
            <div className='wbdv-user-column'>
              <h4>Participants</h4>
              <Link to={`/search/${this.state.courseId}`}
                    className='wbdv-edit-participants-button'>
                <h6>Edit Participants</h6>
              </Link>
              <div className='wbdv-scroll-column'>
                {this.props.selected_users.map(
                    (admin) => this.renderUser(admin))}
              </div>
            </div>
            {this.state.display === 'list' &&
            <div className='wbdv-time-list'>
              <h5>Choose from available times</h5>
              <button
                  className='wbdv-btn wbdv-green-btn'
                  onClick={() => this.setState({display: 'calendar'})}
              >
                Switch to calendar view
              </button>
              <div className='wbdv-time-slot-row'>
                <div className='wbdv-time-slot-day'>Day</div>
                <div className='wbdv-time-slot-start'>Start</div>
                <div className='wbdv-time-slot-end'>End</div>
              </div>
              {this.state.free_time_blocks.map(this.renderFreeTimeBlock)}
              <div className='wbdv-select-time-btn'>
                {Utils.isEmpty(this.props.selected_time_block)
                    ? <h4>Select</h4>
                    : <Link to={this.generateDetailsUrl(
                        this.props.selected_time_block.start,
                        this.props.selected_time_block.end
                    )}>
                      <h4>Select</h4>
                    </Link>}
              </div>
            </div>}
            {this.state.display === 'calendar' &&
            <div className='wbdv-calendar'>
              <div className='wbdv-calendar-title-bar'>
                <div className='wbdv-calendar-title'>Select a time</div>
                <button
                    className='wbdv-btn wbdv-green-btn'
                    onClick={() => this.setState({display: 'list'})}
                >
                  Switch to list view
                </button>
              </div>
              <WeekCalendar
                  selectedIntervals={this.state.free_time_blocks.map(t => {
                    const endDate = new Date(t.end);
                    if (endDate.toLocaleTimeString() === '12:00:00 AM') {
                      const newEnd = new Date(endDate - 1);
                      return {
                        start: moment(t.start),
                        end: moment(newEnd)
                      }
                    } else {
                      return {start: moment(t.start), end: moment(t.end)}
                    }
                  })}
                  scaleUnit={60}
                  useModal={false}
                  onIntervalSelect={(intervals) => this.sendInterval(
                      intervals[0])}
              />
            </div>}
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
  selectTime: (time_block) => dispatch(Actions.selectTime(time_block)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsComponent);