import React, { useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBookDetails } from '../../redux/booksSlice'
import type { AppDispatch, RootState } from '../../redux/store'
import classes from './Book.module.css'

const Book: React.FC = () => {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const bookDetails = useSelector((state: RootState) => state.books.bookDetails)
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		if (id) {
			dispatch(fetchBookDetails(id))
		}
	}, [dispatch, id])

	return (
		<div className={classes.container}>
			<button className={classes.btn} onClick={() => navigate('/')}>
				<FaArrowLeftLong /> <span>Go back</span>
			</button>
			<div className={classes.details}>
				<div className={classes.image}>
					{bookDetails?.covers && bookDetails.covers.length > 0 && (
						<img
							src={`${import.meta.env.VITE_COVER_URL}/${
								bookDetails.covers[0]
							}-M.jpg`}
							alt={bookDetails.title}
						/>
					)}
				</div>
				<div className={classes.info}>
					<h2>{bookDetails?.title}</h2>
					<h4>{bookDetails?.subjects[0]}</h4>
					<p>
						{typeof bookDetails?.description === 'object' &&
						bookDetails.description !== null
							? bookDetails.description.value
							: bookDetails?.description || 'No description found'}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Book
