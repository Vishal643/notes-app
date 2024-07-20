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
		dispatch(setSearchQuery(query)); // Dispatch the action to Redux
	};

	return (
		<div className='navbar'>
			<span className='navbar-logo'>My Notes</span>
			<input
				type='text'
				className='navbar-search'
				placeholder='Search notes...'
				value={search}
				onChange={handleSearchChange} // Connect to handleSearchChange function
			/>
			<button className='navbar-toggle' onClick={onToggleSidebar}>
				☰
			</button>
		</div>
	);
};

export default Navbar;
