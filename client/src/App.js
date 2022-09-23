import './App.css';
import { Detail, Form, Home, LandingPage } from './components/index.js';
import { Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/home" component={Home} />
				<Route exact path="/detail/:id" component={Detail} />
				<Route exact path="/form" component={Form} />
			</Switch>
		</div>
	);
}

export default App;
