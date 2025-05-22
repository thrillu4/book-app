import React from 'react'
import classes from './Search.module.css'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import Loading from '../../components/loading/Loading'
import BookList from '../../components/bookList/BookList'

const Search: React.FC = () => {
	const { loading, searchResults, error } = useSelector(
		(state: RootState) => state.books
	)
	return (
		<div className={classes.section}>
			<div className={classes.container}>
				<div className={classes.books}>
					<div className={classes.title}>
						<h3>Search Results</h3>
					</div>
					{loading ? (
						<Loading />
					) : error ? (
						<div className={classes.error}>{error}</div>
					) : (
						<BookList books={searchResults.slice(0, 16)} />
					)}
				</div>
			</div>
		</div>
	)
}

export default Search
