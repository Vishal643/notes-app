import React from 'react';
import NoteForm from '../../components/NoteForm';
import NoteList from '../../components/NoteList';

const NotesContainer: React.FC = () => {
	return (
		<div className='notes-container'>
			<NoteForm />
			<NoteList />
		</div>
	);
};

export default NotesContainer;
