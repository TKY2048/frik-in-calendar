import React, { Component } from 'react';
import Categories from '../components/Categories';
import appConstants from '../utils/appConstants';
import PropTypes from 'prop-types'

class CategoriesNav extends Component
{
	componentDidMount() {
		this.props.setCategory(this.getInitialCategory());
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.userData !== this.props.userData) {
			this.props.setCategory(this.getInitialCategory());
		}
	}
	
	getInitialCategory = () => {
		let initialCategory = appConstants.categories[0];
		
			const cacheCategory = appConstants.categories.find(cat => cat.slug === this.props.initialCategory);
			if (cacheCategory) {
				initialCategory = cacheCategory;
			}
		return initialCategory;
	};
	
	render() {
		return(
			<Categories
				currentCategory={this.props.currentCategory}
				active={this.props.active}
				onCategoriesClick={this.props.toggleCategories}
				onCategoryClick={this.props.setCategory}
			/>
		);
	}
}

CategoriesNav.propTypes = {
	userData: PropTypes.object,
	initialCategory: PropTypes.string.isRequired,
	currentCategory: PropTypes.object.isRequired,
	active: PropTypes.bool.isRequired,
	toggleCategories: PropTypes.func.isRequired,
	setCategory: PropTypes.func.isRequired
};

export default CategoriesNav;
