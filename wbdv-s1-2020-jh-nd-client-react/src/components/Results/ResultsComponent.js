import React from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Actions from "../../store/Actions";
import * as Utils from '../../utils/Utils'
import googleService from "../../api/GoogleAPIService";

import './ResultsComponent.css'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'];

const fake_time_blocks = [
  { date: '2020-05-29', start: '14:30:00.000', end: '15:30:00.000' },
  { date: '2020-05-29', start: '17:15:00.000', end: '18:15:00.000' },
  { date: '2020-05-30', start: '10:00:00.000', end: '12:45:00.000' },
  { date: '2020-05-30', start: '16:00:00.000', end: '19:00:00.000' },
  { date: '2020-05-31', start: '08:30:00.000', end: '18:30:00.000' },
];


/**
 *
 *
 attendees: [{…}]
 conferenceData: {entryPoints: Array(1), conferenceSolution: {…}, conferenceId: "rfs-kgzg-wvt", signature: "ADR/mfOR6ojIvuReZDZafrVXHfcw"}
 created: "2020-05-29T21:29:51.000Z"
 creator: {email: "nadiia.damrina@gmail.com"}
 description: "This event is to see if we can pool event list"
 end: {dateTime: "2020-05-29T16:30:00-07:00"}
 etag: ""3181575583378000""
 hangoutLink: "https://meet.google.com/rfs-kgzg-wvt"
 htmlLink: "https://www.google.com/calendar/event?eid=Nmg5b2xwZzh1cnJvbmRpMDNkaDdmMmxub2wgNW9wMzNzYW90aWg2NmtkdThpbnVkYnVjYTRAZw"
 iCalUID: "6h9olpg8urrondi03dh7f2lnol@google.com"
 id: "6h9olpg8urrondi03dh7f2lnol"
 kind: "calendar#event"
 organizer: {email: "5op33saotih66kdu8inudbuca4@group.calendar.google.com", displayName: "TutorMe", self: true}
 reminders: {useDefault: true}
 sequence: 0
 start: {dateTime: "2020-05-29T15:30:00-07:00"}
 status: "confirmed"
 summary: "Testing event"
 updated: "2020-05-29T21:29:51.689Z"
 */

class ResultsComponent extends React.Component {
  state={
    free_time_blocks: [],
  };


  componentDidMount() {
    googleService.handleClientLoad(googleService.getEventsList);

  }

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

  renderUser = (user) =>
      <div className='wbdv-user-row' key={user._id}>
        {user.lastName.concat(', ', user.firstName)}
      </div>;

  render() {
    return(
        <div>
          <div className='wbdv-results-page-title-bar'>
            <h1>Results</h1>
          </div>
          <div className='wbdv-time-select-body'>
            <div className='wbdv-user-column'>
              <h4>Participants</h4>
              <Link to='/search' className='wbdv-edit-participants-button'>
                <h6>Edit Participants</h6>
              </Link>
              <div className='wbdv-scroll-column'>
                {this.props.selected_users.map((admin) => this.renderUser(admin))}
              </div>
            </div>
            <div className='wbdv-calendar'>
              Placeholder Calendar Component
            </div>
            <div className='wbdv-time-list'>
              <h5>Choose from available times</h5><div className='wbdv-time-slot-row'>
              <div className='wbdv-time-slot-day'>Day</div>
              <div className='wbdv-time-slot-start'>Start</div>
              <div className='wbdv-time-slot-end'>End</div>
            </div>
              {this.state.free_time_blocks.map(this.renderFreeTimeBlock)}
              <div className='wbdv-select-time-btn'>
                {Utils.isEmpty(this.props.selected_time_block)
                    ? <h4>Select</h4>
                    : <Link to='/details'><h4>Select</h4></Link>}
            </div>
            </div>
          </div>
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