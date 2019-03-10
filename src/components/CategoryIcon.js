import React from 'react';
import PropTypes from 'prop-types';
import IconMain from '../icons/IconMain';
import IconOtaku from '../icons/IconOtaku';
import IconComics from '../icons/IconComics';
import IconGamer from '../icons/IconGamer';
import IconSciFi from '../icons/IconSciFi';
import IconToys from '../icons/IconToys';
import IconTabletop from '../icons/IconTabletop';
import IconHorror from '../icons/IconHorror';
import IconLaMole from '../icons/IconLaMole';
import '../styles/CategoryIcon.css';

const CategoryIcon = (props) => {
	const slug = props.category.slug;
	const iconClass = props.className + ' category-icon icon-' + slug;
	
	let icon;
	switch(slug) {
		case 'main':
			icon = <IconMain />;
			break;
		case 'otaku':
			icon = <IconOtaku />;
			break;
		case 'comics':
			icon = <IconComics />;
			break;
		case 'gamer':
			icon = <IconGamer />;
			break;
		case 'sci-fi-fantasia':
			icon = <IconSciFi />;
			break;
		case 'coleccionismo':
			icon = <IconToys />;
			break;
		case 'tabletop':
			icon = <IconTabletop />;
			break;
		case 'terror':
			icon = <IconHorror />;
			break;
		case 'la-mole':
			icon = <IconLaMole />;
			break;
		default:
			icon = <IconMain />;
	}
	
	
	return(
		<div className={iconClass}>
			{icon}
		</div>
	);
};

CategoryIcon.propTypes = {
	category: PropTypes.object.isRequired,
	className: PropTypes.string
}

export default CategoryIcon;