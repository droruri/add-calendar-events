import * as React from "react";
import {Field, Form} from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {Space} from "antd";
import Snackbar from "@material-ui/core/Snackbar";
import TimePickerLocal from "./date-components/TimePickerLocal";

class AddEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSuccessAlertOpen: false,
      isFailureAlertOpen: false,
    };
  }

  toggleSuccessAlert = () => {
    this.setState({isSuccessAlertOpen: !this.state.isSuccessAlertOpen})
  }

  toggleFailureAlert = () => {
    this.setState({isFailureAlertOpen: !this.state.isFailureAlertOpen})
  }

  handleSubmit = (props) => {
    console.log(props)
    const event = {
      'summary': props.eventName,
      'description': 'generated event',
      'start': {
        'dateTime': `${props.addDate}T${props.addStartTime}:00+02:00`,
        'timeZone': 'Asia/Jerusalem'
      },
      'end': {
        'dateTime': `${props.addDate}T${props.addEndTime}:00+02:00`,
        'timeZone': 'Asia/Jerusalem'
      },
      'attendees': [
        {'email': this.props.auth.userMail}
      ]
    }

    window.gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
    }).then(
      event => this.toggleSuccessAlert(),
      error => this.toggleFailureAlert()
    )
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={({handleSubmit, form, submitting}) => (
          <Space direction='vertical' style={{display:' flex', alignItems:'center', justifyContent:"center"}}>
            <Field name="eventName">
              {props => {
                return <TextField
                  label="Event Name"
                  className='add-event-item'
                  inputProps={{
                    dir: 'auto'
                  }}
                  variant="outlined"
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                />
              }}
            </Field>
            <Field name="addDate" defaultValue={(new Date()).toISOString().split('T')[0]}>
              {props => {
                return <TextField
                  id="addDate"
                  label="Date"
                  className='add-event-item'
                  variant="outlined"
                  type="date"
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              }}
            </Field>
            <Field name="addStartTime">
              {props => {
                return <TextField
                  id="addStartTime"
                  label="Start"
                  className='add-event-item'
                  variant="outlined"
                  type="text"
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  InputProps={{
                    inputComponent: TimePickerLocal,
                  }}
                />
              }}
            </Field>
            <Field name="addEndTime">
              {props => {
                return <TextField
                  id="addEndTime"
                  label="End"
                  className='add-event-item'
                  variant="outlined"
                  type="text"
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  InputProps={{
                    inputComponent: TimePickerLocal,
                  }}
                />
              }}
            </Field>
            <Button onClick={handleSubmit}>Submit</Button>
            <Snackbar open={this.state.isSuccessAlertOpen}
                      autoHideDuration={6000}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      message="The event was added successfully"
                      onClose={this.toggleSuccessAlert}>
            </Snackbar>
          </Space>
        )}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AddEvent)
