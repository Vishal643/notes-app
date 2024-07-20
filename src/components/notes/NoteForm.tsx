import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../features/redux/notesSlice';
import { v4 as uuidv4 } from 'uuid';

const NoteForm: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [imageUrl, setImageUrl] = useState(''); // New state for image URL
	const [hasClickedOnForm, setHasClickedOnForm] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

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
					imageUrl,
				}),
			);
			// Reset form state after submission
			setTitle('');
			setContent('');
			setImageUrl('');
			setHasClickedOnForm(false);
		}
	};

	// on clicking outside the form, set hasClickedOnForm to false
	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setHasClickedOnForm(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<form className='note-form' onSubmit={handleSubmit}>
			<div
				ref={formRef}
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
					<input
						className='note-form-image'
						type='text'
						placeholder='Image URL'
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				)}
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
