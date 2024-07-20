import React from 'react';

const Sidebar: React.FC = () => {
	return (
		<div className='sidebar'>
			<ul>
				<li>Notes</li>
				<li>Reminders</li>
				<li>Labels</li>
				<li>Archive</li>
				<li>Trash</li>
			</ul>
		</div>
	);
};

export default Sidebar;
