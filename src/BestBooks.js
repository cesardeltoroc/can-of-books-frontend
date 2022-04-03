import React from 'react';
import { Carousel } from 'react-bootstrap';

const axios = require('axios');

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

   componentDidMount() {
    this.getBooks();
  }
  getBooks = async () => {
   let url = `${process.env.REACT_APP_SERVER}/books`
   const response = await axios.get(url);
   this.setState({books: response.data});
 }
  
  render() {
    if(!this.state.books.length){
      return (
        <div className='noBooks'>NO BOOKS</div>
      )
    }
    return (
      /* TODO: render user's books in a Carousel */
      
      <Carousel>
        {this.state.books.map(book => (
          <Carousel.Item key={book._id}>
            <img
              src="https://via.placeholder.com/1600x400"
              alt="First slide"
              className='carousel'
            />
            <Carousel.Caption>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}

export default BestBooks;
