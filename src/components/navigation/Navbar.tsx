import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../features/notes/notesSlice';

interface NavbarProps {
	onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
	const [search, setSearch] = useState('');
	const dispatch = useDispatch();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearch(query);
		dispatch(setSearchQuery(query));
	};

	return (
		<div className='navbar'>
			<span className='navbar-logo'>Notes</span>
			<input
				type='text'
				className='navbar-search'
				placeholder='Search notes...'
				value={search}
				onChange={handleSearchChange}
			/>
			<button className='navbar-toggle' onClick={onToggleSidebar}>
				☰
			</button>
		</div>
	);
};

export default Navbar;
