import React from 'react';
import Logo from '../components/Logo';
import '../styles/Header.css'
import CategoriesNav from "../containers/CategoriesNav";
import appConstants from "../utils/appConstants";

const Header = (props) => {

	const prevClass = props.first === true ? 'r-cell r-prev disabled' : 'r-cell r-prev';
	const nextClass = props.last === true ? 'r-cell r-next disabled' : 'r-cell r-next';

	let navButtonColor = '#00cc99';
		let navButton = <Logo/>;

		let headerTitle;

		if (props.currentCategory.slug === 'main')
		{
			headerTitle = 'Eventos Friki';
		}else if (props.currentCategory.slug === 'comics')
		{
			headerTitle = 'Eventos de Cómics'
		}else if (props.currentCategory.slug === 'sci-fi-fantasia')
		{
			headerTitle = 'Eventos de Sci-Fi & Fantasia'
		}else{
			headerTitle = 'Eventos ' + props.currentCategory.slug.charAt(0).toUpperCase() + props.currentCategory.slug.slice(1);
		}


		return(
			<header className="app-header">
				<a href="https://www.frik-in.com" target="_blank" className="logo-button"  style={{ backgroundColor: navButtonColor }}>
					{navButton}
				</a>
				<a href="https://www.frik-in.com" target="_blank">
					<CategoriesNav initialCategory={props.category.slug} currentCategory={props.category} active={false} toggleCategories={()=>null} setCategory={()=>null}/>
				</a>
				<h1 className="page-title">{headerTitle}</h1>
			</header>
		);
};

export default Header;
