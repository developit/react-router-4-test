import { h, Component } from 'preact';
import Router from 'react-router-dom/BrowserRouter';
import { Route, Switch } from 'react-router';
import Header from './header';
import Home from './home';
import Profile from './profile';

export default class App extends Component {
	render() {
		return (
			<Router>
				<div id="app">
					<Header />
					<Switch>
						<Route component={Home} path="/" />
					</Switch>
					<Route exact component={Profile} path="/profile/" user="me" />
					<Route exact component={Profile} path="/profile/:user" />
				</div>
			</Router>
		);
	}
}
