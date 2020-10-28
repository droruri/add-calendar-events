import React from 'react';
import './App.less';
import {compose} from "redux";
import {connect} from "react-redux";
import {fetchAccountSettingsFromLocal, logout} from "./redux/actions/auth.actions";
import {GoogleLogout} from "react-google-login";
import {Link, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AddEventPage from "./pages/AddEventPage";
import PopularEventsPage from "./pages/PopularEventsPage";
import {Button, Drawer, Layout, Space, Typography} from "antd";
import {MenuOutlined} from "@ant-design/icons";

class App extends React.Component {

	componentDidMount() {
		this.props.fetchAccountSettingsFromLocal();
	}

	constructor(props) {
    super(props);
    this.state = {
    	open: false
		};
  }

  toggleDrawer = (isOpen) => {
  	this.setState({open: isOpen})
	}

	closeDrawer = () => {
  	this.toggleDrawer(false)
	}

	onLogout = () => {
		this.toggleDrawer(false);
		this.props.logout();
	}

  render() {
  	const { Header, Content } = Layout;
		const { Text } = Typography;

    return (
      <div className="App">
				<Layout className="app-layout">
					<Header className='app-header' style={{visibility : !this.props.isAuthenticated ? 'hidden' : "visible"}}>
						<Button className='header-button' onClick={() => this.toggleDrawer(true)} type='text'>
							<MenuOutlined
								className='header-color'
								aria-label="menu">
							</MenuOutlined>
						</Button>

						<Text className='header-color header-title' strong>Add calendar events</Text>

					</Header>
					<Content className="app-content"
									 onClick={this.closeDrawer}
									 onKeyDown={this.closeDrawer}>
						<Switch>
							<Route path="/login" component={LoginPage}/>
							<ProtectedRoute exact={true} path="/" component={AddEventPage}/>
							<ProtectedRoute path="/popular" component={PopularEventsPage}/>
						</Switch>
					</Content>
				</Layout>
				<Drawer
					title={this.props.email}
					placement="left"
					closable={true}
					onClose={this.closeDrawer}
					visible={this.state.open}
				>
					<Space direction="vertical">
						<Text strong><Link onClick={this.closeDrawer} to='/'>Add Event</Link></Text>
						<Text strong><Link onClick={this.closeDrawer} to='/popular'>Popular Events</Link></Text>
						<GoogleLogout
							disabled={!this.props.isAuthenticated}
							clientId="59992740525-p429ti7sc76rsf871clrj1gg09emmg9c.apps.googleusercontent.com"
							render={(renderProps) => (
								<Text strong>
									<Link onClick={renderProps.onClick} to='/login'>
										Logout
									</Link>
								</Text>
							)}
							icon={false}
							onLogoutSuccess={this.onLogout}
						/>
					</Space>
				</Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		allData: state,
		isAuthenticated: state.auth.isAuthenticated,
		email: state.auth.userMail,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAccountSettingsFromLocal: () => dispatch(fetchAccountSettingsFromLocal()),
		logout: () => dispatch(logout()),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps)
)(App)
