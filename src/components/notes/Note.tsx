import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	editNote,
	deleteNote,
	togglePinNote,
} from '../../features/redux/notesSlice';
import Modal from '../Modal';

interface NoteProps {
	id: string;
	title: string;
	content: string;
	pinned: boolean;
	imageUrl?: string;
	backgroundColor?: string;
}

const Note: React.FC<NoteProps> = ({
	id,
	title,
	content,
	pinned,
	imageUrl,
	backgroundColor,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(title);
	const [editContent, setEditContent] = useState(content);
	const [editImageUrl, setEditImageUrl] = useState(imageUrl);
	const [editColor, setEditColor] = useState(backgroundColor || '#ffffff');
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
				backgroundColor: editColor,
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
		setEditColor(backgroundColor || '#ffffff');
	}, [title, content, imageUrl, backgroundColor]);

	// Determine if the background color is light or dark
	const isLightColor = (color: string) => {
		const hex = color.replace('#', '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;
		return brightness > 155;
	};

	const textColor =
		backgroundColor && !isLightColor(backgroundColor) ? '#ffffff' : '#000000';

	return (
		<div
			className={`note ${pinned ? 'pinned' : ''}`}
			style={{ backgroundColor: backgroundColor, color: textColor }}>
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
						<div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
								<input
									className='note-form-image'
									type='text'
									placeholder='Image URL'
									value={editImageUrl}
									onChange={(e) => setEditImageUrl(e.target.value)}
								/>
								<input
									className='note-form-color'
									type='color'
									value={editColor}
									onChange={(e) => setEditColor(e.target.value)}
								/>
							</div>
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
					)}
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
