import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import NotesContainer from './features/notes/NotesContainer';
import './styles/styles.css';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<div className='app'>
				<h1>Note Taking App</h1>
				<NotesContainer />
			</div>
		</Provider>
	);
};

export default App;
