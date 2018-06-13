import React from 'react';
import { string } from 'prop-types';

import './styles.scss';

const TextIcon = ({text, icon, iconArrangement}) => {
	return (
		<div className="tw-text-icon">
			{iconArrangement === 'left' &&
				<span className="tw-icon--left">
					<i className={icon}></i>
				</span>
			}
			{text}
			{iconArrangement === 'right' &&
				<span className="tw-icon--right">
					<i className={icon}></i>
				</span>
			}
		</div>
	);
}

export default TextIcon;
