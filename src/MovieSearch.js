import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
//import PropTypes from "prop-types";
import $ from 'jquery'; 
import {useLocation} from 'react-router-dom'
// import { StyleSheet, TouchableOpacity, View } from 'react-native';

const baseUrl = "http://internal-Netflix-WS-ALB-1547091502.eu-west-2.elb.amazonaws.com:8080";


const MovieSearch = () => {
	const [ searchForName, setSearchForName ] = useState('');
	const [ movies, setMovies ] = useState([]);
	const [ favMovies, setFavMovies ] = useState([]);

	const location = useLocation();
	const { selectedUser } = location.state;

	const handleTextBoxChanges = (event) => {
		setSearchForName(event.target.value);
	}

	const handleButtonSearch = (event) => {
		
		event.preventDefault();
		
		$.ajax({
			url: baseUrl + "/netflix/movie/fav/get/" + selectedUser.id
		})
		.then((response) =>
			setFavMovies(response)
		)

		$.ajax({
			url: baseUrl + "/netflix/movie/search/bytitlename/" + searchForName
		})
		.then((response) =>
			setMovies(response)
		)
	}

	return (
		<div>
			<h2>Hello, {selectedUser.firstName}!</h2>
			<form>
				<label>
					Search for Movie Name:&nbsp;
					<input type="text" value={searchForName} onChange={handleTextBoxChanges} />
				</label>
				&nbsp;
				<button onClick={handleButtonSearch}>Search</button>
			</form>
			<MovieList key={movies} movies={movies} favMovies={favMovies} selectedUser={selectedUser} />
		</div>
	);
}

const MovieList = (props) => {
	var movies = props.movies.map((movie) => 
		<Movie key={movie.netflix_id} movie={movie} favMovies={props.favMovies} selectedUser={props.selectedUser} />
	);
	return (
		<div>
		<table>
			<tbody>
				{movies}
			</tbody>
		</table>
		</div>
	)
}

const Movie = (props) => {

	var favMovies = Array.from(props.favMovies);
	const [ exists, setExists ] = useState( favMovies.some(fav => fav.netflixId === props.movie.netflix_id) );
	// const exists = favMovies.some(fav => fav.netflixId === props.movie.netflix_id)
	var favData = { user: { id: props.selectedUser.id }, netflixId: props.movie.netflix_id, titleName: props.movie.title };
	var favData2 = { user: { id: props.selectedUser.id }, netflixId: props.movie.netflix_id };

	const handleButtonFav = (event) => {
		
		event.preventDefault();

		if (exists) {
			// alert("do remove ["+exists+"]");
			$.ajax({
				contentType: 'application/json',
				url: baseUrl + "/netflix/movie/fav/remove",
				data: JSON.stringify( favData2 ),
				dataType: 'json',
				type: 'DELETE'
			})
			.then((response) =>
				alert(response)
			)
			.then(
				setExists(false)
			)
			// alert("do remove end ["+exists+"]");
		} else {
			// alert("do add ["+exists+"]");
			$.ajax({
				contentType: 'application/json',
				data: JSON.stringify( favData ),
				dataType: 'json',
				type: 'POST',
				url: baseUrl + "/netflix/movie/fav/add"
			})
			// .then((response) =>
				// setMovies(response)
			// )
			.then(
				setExists(true)
			)
			// alert("do add ["+exists+"]");
		}
	}

	return (
		<tr>
			<td>
				<form>
					<button onClick={handleButtonFav}>{exists?'Remove':'Add'}</button>
				</form>
			</td>
			<td><img src={props.movie.img} alt={props.movie.title} /></td>
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