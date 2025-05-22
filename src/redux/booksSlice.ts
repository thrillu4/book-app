import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'

interface BookResponse {
	works: {
		author: { name: string }[]
		title: string
		key: string
		cover_id?: number
	}[]
}

interface SearchResponse {
	title: string
	author_name: string[]
	key: string
	cover_i?: number
}

interface BookDetailsResponse {
	title: string
	subjects: string[]
	description: string | { value: string }
	key: string
	covers?: number[]
}

interface BookState {
	booksByCategories: { [category: string]: BookResponse['works'] }
	searchResults: SearchResponse[]
	bookDetails: BookDetailsResponse | null
	loading: boolean
	error: string | null
}

export const fetchBooksByCategories = createAsyncThunk(
	'books/fetchBooksByCategories',
	async (category: string) => {
		const response = await axios.get<BookResponse>(
			`${
				import.meta.env.VITE_BASE_URL
			}/subjects/${category.toLowerCase()}.json?limit=4`
		)
		return { category, books: response.data.works }
	}
)

export const fetchSearchResults = createAsyncThunk<SearchResponse[], string>(
	'books/fetchSearchResults',
	async (query) => {
		const response = await axios.get(
			`${import.meta.env.VITE_BASE_URL}/search.json?q=${query}`
		)
		return response.data.docs.map(
			(doc: {
				title: string
				author_name: string[]
				key: string
				cover_i: number
			}) => ({
				title: doc.title,
				author_name: doc.author_name || [],
				key: doc.key,
				cover_i: doc.cover_i,
			})
		)
	}
)

export const fetchBookDetails = createAsyncThunk<BookDetailsResponse, string>(
	'books/fetchBookDetails',
	async (bookId: string) => {
		const response = await axios.get<BookDetailsResponse>(
			`${import.meta.env.VITE_BASE_URL}/works/${bookId}.json`
		)
		return response.data
	}
)

const initialState: BookState = {
	booksByCategories: {},
	searchResults: [],
	bookDetails: null,
	loading: false,
	error: null,
}

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchBooksByCategories.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(
				fetchBooksByCategories.fulfilled,
				(
					state,
					action: PayloadAction<{
						category: string
						books: BookResponse['works']
					}>
				) => {
					state.loading = false
					state.booksByCategories[action.payload.category] =
						action.payload.books
				}
			)
			.addCase(fetchBooksByCategories.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch books'
			})
			.addCase(fetchSearchResults.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(
				fetchSearchResults.fulfilled,
				(state, action: PayloadAction<SearchResponse[]>) => {
					state.loading = false
					state.searchResults = action.payload
				}
			)
			.addCase(fetchSearchResults.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch data'
			})
			.addCase(fetchBookDetails.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(
				fetchBookDetails.fulfilled,
				(state, action: PayloadAction<BookDetailsResponse>) => {
					state.loading = false
					state.bookDetails = action.payload
				}
			)
			.addCase(fetchBookDetails.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch data'
			})
	},
})

export default bookSlice.reducer
