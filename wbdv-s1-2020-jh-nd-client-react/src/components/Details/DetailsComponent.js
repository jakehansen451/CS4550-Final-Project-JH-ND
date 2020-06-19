import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as Actions from "../../store/Actions";
import * as DateUtils from '../../utils/DateUtils'
import {isEmpty} from "../../utils/Utils";

import './DetailsComponent.css'
import UserService from "../../services/UserService";

class DetailsComponent extends React.Component {
  state = {
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

    if (this.props.selected_users.length > 0) {
      this.setState({
        hostOptions: this.props.selected_users.filter(u =>
            u.role === 'ADMIN' || u.role === 'TUTOR')
      })
    }
  }

  renderHostOption = (user, index) => {
    return (
        <option value={user._id} key={index}>
          {`${user.lastName}, ${user.firstName}`}
        </option>
    )
  };

  render() {
    console.log(this.props);
    console.log(this.state);

    const startDate = new Date(this.state.start);
    const splitArr = startDate.toLocaleDateString().split('/');
    const date = [splitArr[2], splitArr[0].padStart(2, '0'),
      splitArr[1].padStart(2, '0')].join('-');
    console.log(date);

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
              <Link to='/'>
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

/*
<h5>Select Host</h5>
              <select
                  className='wbdv-input'
                  onChange={(e) => this.setState({hostId: e.target.value})}
              >
                {this.state.hostOptions.map(this.generateHostOption)}
              </select>
 */