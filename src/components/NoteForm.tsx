import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../features/notes/notesSlice';
import { v4 as uuidv4 } from 'uuid';

const NoteForm: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [hasClickedOnForm, setHasClickedOnForm] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (content) {
			dispatch(
				addNote({
					id: uuidv4(),
					title,
					content,
					pinned: false,
				}),
			);
			setTitle('');
			setContent('');
			setHasClickedOnForm(false); // Reset form state after submission
		}
	};

	return (
		<form className='note-form' onSubmit={handleSubmit}>
			<div
				className={`note-form-container ${hasClickedOnForm ? 'expanded' : ''}`}
				onClick={() => setHasClickedOnForm(true)}>
				{hasClickedOnForm && (
					<input
						className='note-form-title'
						type='text'
						placeholder='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				)}
				<textarea
					className='note-form-content'
					placeholder='Take a note...'
					value={content}
					onChange={(e) => setContent(e.target.value)}
					onClick={() => setHasClickedOnForm(true)}
				/>
				{hasClickedOnForm && (
					<button className='note-form-button' type='submit'>
						Add Note
					</button>
				)}
			</div>
		</form>
	);
};

export default NoteForm;
