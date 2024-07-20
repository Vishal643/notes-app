import React from 'react';

interface SidebarProps {
	className?: string;
}
const Sidebar: React.FC<SidebarProps> = ({ className }) => {
	return (
		<div className={`sidebar ${className}`}>
			<ul>
				<li>Notes</li>
				<li>Pinned</li>
				<li>Trash</li>
			</ul>
		</div>
	);
};

export default Sidebar;
