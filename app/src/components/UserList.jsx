import React from 'react';
import axios from 'axios';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      error: null
    };
  }

/*
  componentDidMount() {
    fetch('http://localhost:3000/api/users/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.setState({ users: data, isLoading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, isLoading: false });
      });
  }
*/

  componentDidMount() {
   this.fetchData();
  }

  fetchData = async () => {
    const response = await axios.get('http://localhost:3000/api/users/');
    if (response.status == 200) {
    .then(data => {
      this.setState({ users: data, isLoading: false});
    })
    else {
      this.setState({ error: response.status, isLoading: false})
    }
  };

  render() {
    const { users, isLoading, error } = this.state;

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }
}

export default UserList;
