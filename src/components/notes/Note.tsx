import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	editNote,
	deleteNote,
	togglePinNote,
} from '../../features/notes/notesSlice';
import Modal from '../Modal';

interface NoteProps {
	id: string;
	title: string;
	content: string;
	pinned: boolean;
	imageUrl?: string; // Add imageUrl prop
}

const Note: React.FC<NoteProps> = ({
	id,
	title,
	content,
	pinned,
	imageUrl,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(title);
	const [editContent, setEditContent] = useState(content);
	const [editImageUrl, setEditImageUrl] = useState(imageUrl);
	const [hasClickedOnForm, setHasClickedOnForm] = useState(false);

	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			editNote({
				id,
				title: editTitle,
				content: editContent,
				pinned,
				imageUrl: editImageUrl,
			}),
		);
		setIsEditing(false);
	};

	const handleDelete = () => {
		dispatch(deleteNote(id));
	};

	useEffect(() => {
		setEditImageUrl(imageUrl || '');
		setEditTitle(title);
		setEditContent(content);
	}, [title, content, imageUrl]);
	return (
		<div className={`note ${pinned ? 'pinned' : ''}`}>
			<Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
				<div onClick={() => setHasClickedOnForm(true)}>
					{hasClickedOnForm && (
						<input
							className='note-form-title'
							type='text'
							placeholder='Title'
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>
					)}
					<textarea
						className='note-form-content'
						placeholder='Take a note...'
						value={editContent}
						onChange={(e) => setEditContent(e.target.value)}
						onClick={() => setHasClickedOnForm(true)}
					/>
					{hasClickedOnForm && (
						<input
							className='note-form-image'
							type='text'
							placeholder='Image URL'
							value={editImageUrl}
							onChange={(e) => setEditImageUrl(e.target.value)}
						/>
					)}
					<div>
						<button className='note-form-button' onClick={handleEdit}>
							Save
						</button>
						<button
							className='cancel-button'
							onClick={() => setIsEditing(false)}>
							Cancel
						</button>
					</div>
				</div>
			</Modal>

			<div className='note-content' onClick={() => setIsEditing(true)}>
				{imageUrl && <img src={imageUrl} alt='Note' className='note-image' />}
				<h3>{title}</h3>
				<p>{content}</p>
			</div>

			<button
				className='pin-button'
				onClick={(e) => {
					e.stopPropagation();
					dispatch(togglePinNote(id));
				}}>
				{pinned ? '📌' : '📍'}
			</button>

			<button
				className='delete-button'
				onClick={(e) => {
					e.stopPropagation();
					handleDelete();
				}}>
				Delete
			</button>
		</div>
	);
};

export default Note;
