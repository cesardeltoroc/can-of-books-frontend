import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  async componentDidMount() {
    console.log(this.props.auth0)
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      // This gives use token for back end.
      console.log('token: ', jwt);
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'get',
        baseURL: process.env.REACT_APP_HEROKU,
        url: '/books'
      }

      const booksResponse = await axios(config);
      this.setState({ books: booksResponse.data });
    }
  }

  render() {
    return (
      <div className='userBooks'>
        <h1>Saved Books:</h1>
          {this.state.books.map(book => (
            <>
            <h1 key={book._id}>{book.title}</h1>
            <p key={book.description}>{book.description}</p>
            </>
          ))}
      </div>
    )
  }
}

export default withAuth0(Content);
