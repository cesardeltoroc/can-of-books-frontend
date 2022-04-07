import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

class BestBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carouselIndex: 0,
    }
  }

  carouselSelect = (selectedIndex, e) => {
    this.setState({
      carouselIndex: selectedIndex,
    })
  }

  render() {
    if(!this.props.books.length){
      return (
        <div className='noBooks'>NO BOOKS</div>
      )
    }
    return (
      <>
        <Carousel activeIndex={this.state.carouselIndex} onSelect={this.carouselSelect}>
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
        <Button
          onClick={() => this.props.handleDeleteBook(this.props.books[this.state.carouselIndex]._id)}>
          <FontAwesomeIcon icon={faXmark}/>
        </Button>
      </>
    );
  }
};

export default BestBooks;
