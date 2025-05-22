import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooksByCategories } from '../../redux/booksSlice'
import type { AppDispatch, RootState } from '../../redux/store'
import classes from './Home.module.css'
import BookList from '../../components/bookList/BookList'

const Home: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const booksByCategories = useSelector(
		(state: RootState) => state.books.booksByCategories
	)

	useEffect(() => {
		const categories = ['Fictions', 'Mystery', 'Romance', 'Fantasy']
		categories.forEach((category) => {
			if (!booksByCategories[category]) {
				dispatch(fetchBooksByCategories(category))
			}
		})
	}, [dispatch, booksByCategories])

	return (
		<div className={classes.section}>
			<div className={classes.container}>
				{Object.keys(booksByCategories).map((category, categoryIndex) => {
					const books = booksByCategories[category]
					return (
						<div className={classes.books} key={categoryIndex}>
							<div className={classes.title}>
								<h3>{category}</h3>
								<BookList books={books.slice(0, 4)} />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Home
