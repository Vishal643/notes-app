import React from 'react';

interface SidebarProps {
	className?: string;
	isVisible: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ className, isVisible }) => {
	return (
		<div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
			<ul>
				<li>Notes</li>
				<li>Pinned</li>
				<li>Trash</li>
			</ul>
		</div>
	);
};

export default Sidebar;
