import React from 'react';
import NoteForm from '../../components/notes/NoteForm';
import NoteList from '../../components/notes/NoteList';

const NotesContainer: React.FC = () => {
	return (
		<div className='notes-container'>
			<NoteForm />
			<NoteList />
		</div>
	);
};

export default NotesContainer;
