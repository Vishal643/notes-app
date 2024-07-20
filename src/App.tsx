import { Provider } from 'react-redux';
import store from './store';
import NotesContainer from './features/notes/NotesContainer';
import './styles/styles.css';
import Navbar from './components/navigation/Navbar';

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<div className={'app'}>
				<Navbar />
				<div className='main-content'>
					<NotesContainer />
				</div>
			</div>
		</Provider>
	);
};

export default App;
