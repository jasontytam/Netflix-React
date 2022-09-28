import './App.css';
import MovieSearch from './MovieSearch';
import UserSearch from './UserSearch';

import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';

const Navigation = () => (
	<nav>
		<ul>
			<li><NavLink exact activeClassName="current" to='/users'>Switch User</NavLink></li>
		</ul>
	</nav>
);

const Home = () => (
	<div className='home'>
		<h1>Welcome!</h1>
		<p></p>
	</div>
);

const Main = () => (
	<Routes>
		<Route path='/' element={<Home />}></Route>
		<Route path='/users' element={<UserSearch />}></Route>
		<Route path='/movies' element={<MovieSearch />}></Route>
	</Routes>

);

const App = () => (
	<div className="app">
		<body>
			<Navigation />
			<Main />
		</body>
	</div>
);


export default App;
