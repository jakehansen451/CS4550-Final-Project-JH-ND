import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as Actions from "../../store/Actions";
import * as DateUtils from '../../utils/DateUtils'
import googleService from "../../api/GoogleAPIService";
import {isEmpty} from "../../utils/Utils";

import './DetailsComponent.css'

class DetailsComponent extends React.Component {
  componentDidUpdate() {
    if (isEmpty(this.props.current_user)) {
      console.log(this.props);
      this.props.history.push('/');
    }
  }

  createUserOption = (user) => {
    return (
        <option value={user._id}>
          {`${user.lastName}, ${user.firstName}`}
        </option>
    )
  };

  addMeeting = () => {
    let date = this.props.selected_time_block.date;
    let startDateTime = new Date(
        date + " " + this.props.selected_time_block.start
        + " UTC").toISOString();
    let endDateTime = new Date(
        date + " " + this.props.selected_time_block.end + " UTC").toISOString();

    googleService.addEvent(startDateTime, endDateTime, [], "Demo title");
  };

  render() {
    const time_block = this.props.selected_time_block;
    const date = time_block.date;
    const start = time_block.start;
    const end = time_block.end;
    const startLocal = DateUtils.localFromUTCDateTime(date, start, 'en-GB');
    const endLocal = DateUtils.localFromUTCDateTime(date, end, 'en-GB');

    return (
        <div>
          <h1>Details</h1>
          <div>
            <div>
              <form className='wbdv-details-form'>
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
                    {this.props.selected_users.map(this.createUserOption)}
                  </select>
                </div>
              </form>
              <Link onClick={this.addMeeting} to='/'>
                <h4>Schedule Meeting</h4>
              </Link>
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