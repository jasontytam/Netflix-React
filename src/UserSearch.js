import React from 'react';
import $ from 'jquery'; 
import { NavLink } from 'react-router-dom';


class UserSearch extends React.Component { 

	constructor(props) {
		super(props);
		this.state = {netflixUsers: []};
	}

	componentDidMount() { 
		$.ajax({
			url: "http://localhost:8080/netflix/user/get"
		})
		.then((response) =>
			this.setState({
				netflixUsers:response
			})
		);  
	}

	render() {
		return (
			<NetflixUserList netflixUsers={this.state.netflixUsers}/>
		)
	}
}

class NetflixUserList extends React.Component{
	render() {
		var netflixUsers = this.props.netflixUsers.map(netflixUser =>
			<NetflixUser key={netflixUser.id} netflixUser={netflixUser}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Action</th>
						<th>Login</th>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
					{netflixUsers}
				</tbody>
			</table>
		)
	}
}

class NetflixUser extends React.Component{
	render() {
		return (
			<tr>
				<td>
					<NavLink exact 
						to='/movies'
						state={{selectedUser: this.props.netflixUser}}>Browse Movies</NavLink>
				</td>
				<td>{this.props.netflixUser.login}</td>
				<td>{this.props.netflixUser.firstName}</td>
				<td>{this.props.netflixUser.lastName}</td>
			</tr>
		)
	}
}

export default UserSearch;