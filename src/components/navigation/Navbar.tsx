import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../features/notes/notesSlice';

const Navbar: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const dispatch = useDispatch();

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		dispatch(setSearchQuery(e.target.value));
	};

	return (
		<div className='navbar'>
			<div className='navbar-logo'>My Keep</div>
			<input
				className='navbar-search'
				type='text'
				placeholder='Search'
				value={searchQuery}
				onChange={handleSearchChange}
			/>
		</div>
	);
};

export default Navbar;
