import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import NotesContainer from './features/notes/NotesContainer';
import './styles/styles.css';
import Navbar from './components/navigation/Navbar';
import Sidebar from './components/navigation/Sidebar';

const App: React.FC = () => {
	const [isSidebarVisible, setSidebarVisible] = useState(true);

	const handleToggleSidebar = () => {
		setSidebarVisible(!isSidebarVisible);
	};
	return (
		<Provider store={store}>
			<div className='app'>
				<Navbar onToggleSidebar={handleToggleSidebar} />
				<Sidebar className={isSidebarVisible ? '' : 'hidden'} />
				<div
					className={`main-content   ${
						isSidebarVisible ? 'main-content-with-sidebar' : ''
					}`}>
					<NotesContainer />
				</div>
			</div>
		</Provider>
	);
};

export default App;
