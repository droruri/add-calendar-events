import * as React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getAuthDetails} from "../services/auth.service";

class ProtectedRoute extends React.Component{
  render() {
    const Component = this.props.component;
    const isAuthenticated = !!getAuthDetails();

    return isAuthenticated ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/login' }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(ProtectedRoute)
