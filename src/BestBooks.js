import React from 'react';
import UpdateBook from './UpdateBook';
import { Carousel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import books from './images/books-back.jpeg'

class BestBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carouselIndex: 0,
      updateModalShown: false,
      title: '',
      description: '',
    }
  }

  carouselSelect = (selectedIndex, e) => {
    this.setState({
      carouselIndex: selectedIndex,
    })
  }

  openUpdateModal = book => {
    this.setState({
      updateModalShown: true,
      title: book.title,
      description: book.description,
    })
  }

  closeModal = () => {
    this.setState({
      updateModalShown: false,
    })
  }

  render() {
    if(!this.props.books.length){
      return (
        <div className='noBooks'>NO BOOKS!</div>
      )
    }
    const selectedBook = this.props.books[this.state.carouselIndex];
    return (
      <>
        <Carousel
          interval={null}
          activeIndex={this.state.carouselIndex}
          onSelect={this.carouselSelect}>
          {this.props.books.map(book => (
            <Carousel.Item key={book._id}>
              <img
                src={books}
                alt="First slide"
                className="carousel-image"
              />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <Button onClick={e => this.openUpdateModal(book)}>
                  Update this Book
                </Button>
                <Button
                  variant="danger"
                  onClick={() => this.props.handleDeleteBook(book._id)}>
                  <FontAwesomeIcon icon={faXmark}/>
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <UpdateBook
          id={selectedBook._id}
          title={this.state.title}
          description={this.state.description}
          show={this.state.updateModalShown}
          closeModal={this.closeModal}
          handleUpdateBook={this.props.handleUpdateBook}
          updateFormState={this.props.updateFormState} />
      </>
    );
  }
};

export default BestBooks;
