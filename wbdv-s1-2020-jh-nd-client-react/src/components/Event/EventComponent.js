import React from 'react';
import EventService from "../../services/EventService";
import NavigatorComponent from "../Navigator/NavigatorComponent";

class EventComponent extends React.Component {
  state = {
    eventId: this.props.match.params.eventId,
    event: {},
  };

  componentDidMount() {
    EventService.getEvent(this.state.eventId)
    .then(event => this.setState({event}))
  }

  render() {
    return (
        <div>
            <NavigatorComponent currentPage={this.props.history.location.pathname}/>
          <h2>{this.state.event.title}</h2>
          <h6>{this.state.event.start}</h6>
          <h6>{this.state.event.end}</h6>
        </div>
    )
  }
}

export default EventComponent;