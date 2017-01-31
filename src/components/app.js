import { h, Component } from 'preact';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router/Route';
import Header from './header';
import Home from './home';
import Profile from './profile';

export default class App extends Component {
	render() {
		return (
			<Router>
				<div id="app">
					<Header />
					<Route component={Home} exact path="/" />
					<Route component={Profile} exact path="/profile/" user="me" />
					<Route component={Profile} exact path="/profile/:user" />
				</div>
			</Router>
		);
	}
}
