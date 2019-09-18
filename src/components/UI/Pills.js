import React, { useState } from 'react';

const Pills = (props) => {
	const { tabs, handleClick } = props;
	const [activeTab, setActiveTab] = useState(null);

	const handleTabChange = (e) => {
		const pos = Number(e.target.dataset.pos);

		if (pos === activeTab) {
			setActiveTab(null);
			props.handleClick(null);
		} else {
			setActiveTab(pos);
			handleClick(tabs[pos].name, tabs[pos].id);
		}
	};

	return (
		<div className="Pills">
			<nav className="nav nav-pills">
				{tabs.map((tab, i) => (
					<button
						className={`btn btn-link nav-item nav-link ${i === activeTab ? 'active' : ''}`}
						onClick={handleTabChange}
						type="button"
						key={tab.id || i}
						data-pos={i}
						data-id={tab.id}
						disabled={tab.disabled === undefined ? false : tab.disabled}
					>
						{tab.name}
					</button>
				))}
			</nav>
		</div>
	);
};

Pills.defaultProps = {
	tabs: []
};

export default Pills;
