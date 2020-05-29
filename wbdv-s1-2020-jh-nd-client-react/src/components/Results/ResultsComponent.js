import React from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './ResultsComponent.css'
import * as Actions from "../../store/Actions";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'];

const fake_time_blocks = [
  { date: '2020-05-29', start: '14:30:00.000', end: '15:30:00.000' },
  { date: '2020-05-29', start: '17:15:00.000', end: '18:15:00.000' },
  { date: '2020-05-30', start: '10:00:00.000', end: '12:45:00.000' },
  { date: '2020-05-30', start: '16:00:00.000', end: '19:00:00.000' },
  { date: '2020-05-31', start: '08:30:00.000', end: '18:30:00.000' },
];

class ResultsComponent extends React.Component {
  state={
    free_time_blocks: fake_time_blocks,
  };

  recomposeISO = (date, time) => `${date}T${time}Z`;


  renderFreeTimeBlock = (timeSlot, index) => {
    const start_datetime = new Date(this.recomposeISO(timeSlot.date, timeSlot.start));
    const end_datetime = new Date(this.recomposeISO(timeSlot.date, timeSlot.end));
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

  render() {
    return(
        <div>
          <h1>Results</h1>
          <div className='wbdv-time-select-body'>
            <div className='wbdv-calendar'>
              <CalendarComponent />
            </div>
            <div className='wbdv-time-list'>
              <h5>Choose from available times</h5><div className='wbdv-time-slot-row'>
              <div className='wbdv-time-slot-day'>Day</div>
              <div className='wbdv-time-slot-start'>Start</div>
              <div className='wbdv-time-slot-end'>End</div>
            </div>
              {this.state.free_time_blocks.map(this.renderFreeTimeBlock)}
            </div>
          </div>
          <Link to='/search' className='wbdv-edit-participants-button'>
            Edit Participants
          </Link>
        </div>
    )}
}

const mapStateToProps = (state) => ({
  selected_users: state.selected_users,
  selected_time_block: state.selected_time_block,
});

const mapDispatchToProps = (dispatch) => ({
  selectTime: (time_block) => dispatch(Actions.selectTime(time_block)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsComponent);