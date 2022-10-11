import './App.css';
import { Detail, Form, Home, LandingPage } from './components/index.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home">
						<Home />
					</Route>
					<Route exact path="/detail/:id" component={Detail} />
					<Route exact path="/form" component={Form} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
