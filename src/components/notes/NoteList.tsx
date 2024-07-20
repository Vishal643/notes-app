import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Note from './Note';

const NoteList: React.FC = () => {
	const notes = useSelector((state: RootState) => state.notes.notes);
	const searchQuery = useSelector(
		(state: RootState) => state.notes.searchQuery,
	);

	const filteredNotes = notes.filter(
		(note) =>
			note?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			note.content.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className='note-list'>
			{filteredNotes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					title={note.title || ''}
					content={note.content}
					pinned={note.pinned}
					imageUrl={note.imageUrl}
					backgroundColor={note.backgroundColor}
				/>
			))}
		</div>
	);
};

export default NoteList;
