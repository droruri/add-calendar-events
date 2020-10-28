import * as React from "react";
import {connect} from "react-redux";

const gapi = window.gapi

class PopularEventsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

  }

  handleClick() {
    console.log(this.props.auth);
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => {
      const events = response.result.items
      console.log('EVENTS: ', events)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>click me</button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};



export default connect(mapStateToProps)(PopularEventsPage)
