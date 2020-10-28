import * as React from "react";
import GoogleLogin from "react-google-login";
import {loginSuccess, logout} from "../redux/actions/auth.actions";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class LoginPage extends React.Component{

  responseGoogle(response) {
    if(response){
      this.props.loginSuccess(response)
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <GoogleLogin
        disabled={this.props.isAuthenticated}
        clientId="59992740525-p429ti7sc76rsf871clrj1gg09emmg9c.apps.googleusercontent.com"
        buttonText="Login"
        scope={"https://www.googleapis.com/auth/calendar.events"}
        isSignedIn={true}
        onSuccess={this.responseGoogle.bind(this)}
        onFailure={this.responseGoogle.bind(this)}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    loginSuccess: (token) => dispatch(loginSuccess(token))
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(LoginPage)
