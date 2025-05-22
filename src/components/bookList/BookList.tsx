import React from 'react'
import classes from './BookList.module.css'
import { Link } from 'react-router-dom'

interface Book {
	title: string
	key: string
	author_name?: string[]
	authors?: { name: string }[]
	cover_i?: number
	cover_id?: number
}

interface BookListProps {
	books: Book[]
}

const BookList: React.FC<BookListProps> = ({ books }) => {
	return (
		<div className={classes.list}>
			{books.length > 0 ? (
				books.map((book, bookIndex) => (
					<Link
						to={`/works${book.key.replace('/works', '')}`}
						className={classes.item}
						key={bookIndex}
					>
						<div className={classes.image}>
							{book.cover_id ? (
								<img
									src={`${import.meta.env.VITE_COVER_URL}/${
										book.cover_id
									}-M.jpg`}
									alt={book.title}
								/>
							) : book.cover_i ? (
								<img
									src={`${import.meta.env.VITE_COVER_URL}/${
										book.cover_i
									}-M.jpg`}
									alt={book.title}
								/>
							) : (
								<div>No Cover Available</div>
							)}
						</div>
						<div className={classes.info}>
							<div className={classes.bookTitle}>
								<h3 title={book.title}>{book.title}</h3>
							</div>
							<div className={classes.author}>
								<span>
									{book.authors
										? book.authors[0]?.name
										: book.author_name?.[0] || 'Unknown Author'}
								</span>
							</div>
							<div className={classes.details}>
								<span>View Details</span>
							</div>
						</div>
					</Link>
				))
			) : (
				<div>No Books Found</div>
			)}
		</div>
	)
}

export default BookList
