import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import Book from './pages/book/Book'
import Home from './pages/home/Home'
import Search from './pages/search/Search'

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/search' element={<Search />} />
				<Route path='/works/:id' element={<Book />} />
			</Routes>
		</>
	)
}

export default App
