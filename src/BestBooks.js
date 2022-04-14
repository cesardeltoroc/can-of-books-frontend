import React from 'react';
import UpdateBook from './UpdateBook';
// import axios from './axios'
import { Carousel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

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
  deleteBook = (id) => {
    this.setState({carouselIndex: this.state.carouselIndex -1})
    this.props.handleDeleteBook(id);
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
        {typeof this.props.books}
        <Carousel
          interval={null}
          activeIndex={this.state.carouselIndex}
          onSelect={this.carouselSelect}>
          {this.props.books.map(book => (
            <Carousel.Item key={book._id}>
              <img
                src={book.image}
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
                  onClick={() => this.deleteBook(book._id)}>
                  <FontAwesomeIcon icon={faXmark}/>
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        {selectedBook && (
          <UpdateBook
            id={selectedBook._id}
            title={this.state.title}
            description={this.state.description}
            show={this.state.updateModalShown}
            closeModal={this.closeModal}
            handleUpdateBook={this.props.handleUpdateBook}
            updateFormState={this.props.updateFormState} />
        )}
      </>
    );
  }
};

export default BestBooks;
