import React from 'react';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  render() {
    console.log(this.props.books);
    if(!this.props.books.length){
      return (
        <div className='noBooks'>NO BOOKS</div>
      )
    }
    return (
      /* TODO: render user's books in a Carousel */
      
      <Carousel>
        {this.props.books.map(book => (
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
