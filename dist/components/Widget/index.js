import React from 'react';
import { Link } from 'react-router-dom';

import './Widget.scss';

var Widget = function Widget(props) {
	var title = props.title,
	    icon = props.icon,
	    link = props.link,
	    iconBackground = props.iconBackground,
	    iconColor = props.iconColor,
	    margin = props.margin;


	var content = React.createElement(
		'div',
		{ className: 'Widget' },
		React.createElement(
			'div',
			{ className: 'border rounded shadow-sm ' + (margin ? 'margin' : '') },
			React.createElement('i', {
				className: icon + ' w-100 fa-2x text-center py-4',
				style: { background: iconBackground, color: iconColor }
			}),
			React.createElement(
				'div',
				{ className: 'p-3 text-center font-weight-bold' },
				React.createElement(
					'span',
					null,
					title
				)
			)
		)
	);

	return link.length ? React.createElement(
		Link,
		{ className: 'card-link', to: link },
		content
	) : content;
};

Widget.defaultProps = {
	title: '',
	icon: '',
	link: '',
	iconColor: 'white',
	margin: true
};

export default Widget;