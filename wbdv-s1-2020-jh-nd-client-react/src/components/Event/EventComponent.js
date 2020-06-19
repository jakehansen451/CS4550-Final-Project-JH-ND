import React from 'react';
import {connect} from 'react-redux';
import EventService from "../../services/EventService";
import {isEmpty} from "../../utils/Utils";
import {Link} from "react-router-dom";
import '../../styles.css';
import './EventComponent.css';

class EventComponent extends React.Component {
  state = {
    eventId: this.props.match.params.eventId,
    event: {},
  };

  componentDidMount() {
    EventService.getEvent(this.state.eventId)
    .then(event => this.setState({event}))
  }

  removeSeconds = (localTimeStr) => {
    const splitArr = localTimeStr.split(' ');
    return splitArr[0].substring(0, 4).concat(' ', splitArr[1]);
  };

  deleteEvent = () => {
    EventService.deleteEvent(this.state.eventId)
    .then(r => {
      this.props.history.push(`/courses/${this.state.event.course._id}`);
    })
  };

  render() {
    const startDate = new Date(this.state.event.start);
    const endDate = new Date(this.state.event.end);
    const timeStr = `${
        this.removeSeconds(startDate.toLocaleTimeString())} to ${
        this.removeSeconds(endDate.toLocaleTimeString())}`;

    const shouldShowDeleteBtn = !isEmpty(this.props.current_user)
        && !isEmpty(this.state.event)
        && this.state.event.organizer._id === this.props.current_user._id;

    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return (!isEmpty(this.state.event) &&
        <div>
          <h2>{this.state.event.title}</h2>
          <div className='wbdv-event-host-row'>
            <h6 className='wbdv-hosted-by'>Hosted by:</h6>
            <Link to={`/profile/${this.state.event.organizer._id}`}>
              {`${this.state.event.organizer.lastName}, `
              .concat(`${this.state.event.organizer.firstName}`)}
            </Link>
          </div>
          <div className='wbdv-event-date-time'>
            <h6>
              {startDate.toLocaleDateString('en-US', options)}
            </h6>
            <h6>{timeStr}</h6>
          </div>
          {shouldShowDeleteBtn &&
          <button
              onClick={this.deleteEvent}
              className='wbdv-btn wbdv-red-btn wbdv-delete-event-btn'
          >
            Delete event
          </button>}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

export default connect(mapStateToProps, null)(EventComponent);