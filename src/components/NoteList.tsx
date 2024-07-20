import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Note from './Note';

const NoteList: React.FC = () => {
	const notes = useSelector((state: RootState) => state.notes.notes);

	return (
		<div className='note-list'>
			{notes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					title={note.title || ''}
					content={note.content}
					pinned={note.pinned}
				/>
			))}
		</div>
	);
};

export default NoteList;
