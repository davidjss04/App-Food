import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Router';

function App() {
	return (
		<BrowserRouter>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</BrowserRouter>
	);
}

export default App;
