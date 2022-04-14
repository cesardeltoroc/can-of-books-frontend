import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
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
