import React, { useEffect, useState } from 'react';
//import ReactDOM from 'react-dom';
//import PropTypes from "prop-types";
import $ from 'jquery'; 
import {useLocation} from 'react-router-dom'
// import { StyleSheet, TouchableOpacity, View } from 'react-native';


const MovieSearch = () => {
	const [ searchForName, setSearchForName ] = useState('');
	const [ movies, setMovies ] = useState([]);
	const [ favMovies, setFavMovies ] = useState([]);

	const location = useLocation();
	const { selectedUser } = location.state;

	useEffect(() => {
		$.ajax({
			url: "http://localhost:8080/netflix/movie/fav/get/" + selectedUser.id
		})
		.then((response) =>
			setFavMovies(response)
		)
	}, []);

	const handleTextBoxChanges = (event) => {
		setSearchForName(event.target.value);
	}

	const handleButtonSearch = (event) => {
		
		event.preventDefault();
		
		$.ajax({
			url: "http://localhost:8080/netflix/movie/search/" + searchForName
		})
		.then((response) =>
			setMovies(response)
		)
	}

	return (
		<div>
			<h2>Hello, {selectedUser.firstName}!</h2>
			<h3>{favMovies}</h3>

			<form>
				<label>
					Search for Movie Name:&nbsp;
					<input type="text" value={searchForName} onChange={handleTextBoxChanges} />
				</label>
				&nbsp;
				<button onClick={handleButtonSearch}>Search</button>
			</form>
			<div id="result"></div>
			<MovieList key={movies} movies={movies}/>
		</div>
	);
}

const MovieList = (props) => {
	var movies = props.movies.map(movie =>
		<Movie key={movie.imdb_id} movie={movie}/>
	);
	return (
		<table>
			<tbody>
				{movies}
			</tbody>
		</table>
	)
}

const Movie = (props) => {
	return (
		<tr>
			<td>
				<form>
				</form>
			</td>
			<td><img src={props.movie.img} alt={props.movie.title}  /></td>
			<td>
				<h3>{props.movie.title} ({props.movie.year})</h3>
				<br />
				<p>{props.movie.synopsis}</p>
			</td>
		</tr>
	)
}

// export class PentagonButton extends React.Component {
// 	render() {
// 	  return (
// 		  <TouchableOpacity onPress={() => { }}>
// 			<View style={styles.pentagon}>
// 			  <View style={styles.pentagonInner} />
// 			  <View style={styles.pentagonBefore} />
// 			</View>
// 		  </TouchableOpacity>
// 	  );
// 	}
//   }
  
  
//   const styles = StyleSheet.create({
// 	container: {
// 	  flex: 1,
// 	  alignItems: 'center',
// 	  justifyContent: 'center',
// 	},
// 	pentagon: {
// 	  backgroundColor: 'transparent'
// 	},
// 	pentagonInner: {
// 	  width: 90,
// 	  borderBottomColor: 'red',
// 	  borderBottomWidth: 0,
// 	  borderLeftColor: 'transparent',
// 	  borderLeftWidth: 18,
// 	  borderRightColor: 'transparent',
// 	  borderRightWidth: 18,
// 	  borderTopColor: 'red',
// 	  borderTopWidth: 50
// 	},
// 	pentagonBefore: {
// 	  position: 'absolute',
// 	  height: 0,
// 	  width: 0,
// 	  top: -35,
// 	  left: 0,
// 	  borderStyle: 'solid',
// 	  borderBottomColor: 'red',
// 	  borderBottomWidth: 35,
// 	  borderLeftColor: 'transparent',
// 	  borderLeftWidth: 45,
// 	  borderRightColor: 'transparent',
// 	  borderRightWidth: 45,
// 	  borderTopWidth: 0,
// 	  borderTopColor: 'transparent',
// 	}
//   });

export default MovieSearch;