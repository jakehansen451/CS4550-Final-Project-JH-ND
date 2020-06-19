import React from 'react';
import {isEmpty} from "../../utils/Utils";
import EventService from "../../services/EventService";

class EventComponent extends React.Component {
  state = {
    eventId: this.props.match.params.eventId,
    event: {},
  };

  componentDidMount() {
    EventService.getEvent(this.state.eventId)
    .then(event => {
      console.log(event);
      this.setState({event})
    })
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
        <div>
          <h2>{this.state.event.title}</h2>
          <h6>{this.state.event.start}</h6>
          <h6>{this.state.event.end}</h6>
        </div>
    )
  }
}

export default EventComponent;