import React from 'react';
import PropTypes from 'prop-types';
import CategoryIcon from '../components/CategoryIcon';
import appConstants from '../utils/appConstants';
import '../styles/Categories.css';

const Categories = (props) => {
	const active = props.active;
	const currentCategory = props.currentCategory;
	let className = 'app-categories';
	if (active) {
		className += ' active';
	}
	
	return(
		<nav className={className} onClick={props.onCategoriesClick}>
			<div className="buttons-container">
				<button className="category-toggle" aria-label="Categorias" />
				{appConstants.categories.map((category, index) => {
					let buttonClass = 'category-btn ' + category.slug + '-btn';
					if (currentCategory.slug === category.slug) {
						buttonClass += ' selected';
					}
					
					return(
						<button key={category.id} aria-label={category.name} className={buttonClass} onClick={() => props.onCategoryClick(category)}>
							<CategoryIcon index={index} category={category} />
							<span>{category.name}</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
};

Categories.propTypes = {
	currentCategory: PropTypes.object.isRequired,
	active: PropTypes.bool.isRequired,
	onCategoriesClick: PropTypes.func.isRequired,
	onCategoryClick: PropTypes.func.isRequired
};

export default Categories;
