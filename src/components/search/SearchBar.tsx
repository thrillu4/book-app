import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchSearchResults } from '../../redux/booksSlice'
import type { AppDispatch } from '../../redux/store'
import classes from './SearchBar.module.css'

const SearchBar: React.FC = () => {
	const [query, setQuery] = useState('')
	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (query.trim()) {
			dispatch(fetchSearchResults(query))
			navigate('/search')
			setQuery('')
		}
	}

	return (
		<div className={classes.section}>
			<div className={classes.container}>
				<form onSubmit={handleSearchSubmit}>
					<div className={classes.formContainer}>
						<input
							type='text'
							placeholder='Search for books...'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button type='submit'>
							<FaSearch />
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SearchBar
