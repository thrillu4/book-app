import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchSearchResults } from '../../redux/booksSlice'
import type { AppDispatch } from '../../redux/store'
import classes from './Categories.module.css'
import { useNavigate } from 'react-router-dom'

const Categories: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()
	const categories = [
		'Science Fiction',
		'Fantasy',
		'Romance',
		'Mystery',
		'Biography',
		'History',
		'Technology',
		'Arts',
		'Literature',
		'Philosophy',
		'Health',
		'Religion',
		'Law',
		'Cooking',
	]

	const handleSearchByCategory = (e: React.MouseEvent, category: string) => {
		e.preventDefault()
		dispatch(fetchSearchResults(category))
		navigate('/search')
	}

	return (
		<div className={classes.section}>
			{categories.map((category, index) => (
				<span
					onClick={(e) =>
						handleSearchByCategory(e, category.toLocaleLowerCase())
					}
					key={index}
				>
					{category}
				</span>
			))}
		</div>
	)
}

export default Categories
