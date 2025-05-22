import React from 'react'
import Categories from '../categories/Categories'
import SearchBar from '../search/SearchBar'
import classes from './Header.module.css'

const Header: React.FC = () => {
	return (
		<div className={classes.section}>
			<div className={classes.container}>
				<h2>Books App</h2>
				<SearchBar />
				<Categories />
			</div>
		</div>
	)
}

export default Header
