import React from 'react';
import UpdateBook from './UpdateBook';
import { Carousel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import carouselBackground from './images/books-back.jpeg'
import AddBook from './AddBook';

// api call methods, and some comment reminder
// get something back
const GET = 'get'
// update something
const PUT = 'put'
// add something new
const POST = 'post'
// remove something old
const DELETE = 'delete'

class BestBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      carouselIndex: 0,
      addModalShown: false,
      updateModalShown: false,
      title: '',
      description: '',
      books: [],
    }
  }

  apiCall = async (method, url, body) => {
    if (!this.props.auth0.isAuthenticated) {
      return // you have no right!
    }
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
  
    const call = {
      headers: { "Authorization": `Bearer ${jwt}` },
      method: method,
      baseURL: process.env.REACT_APP_HEROKU,
      url: url,
      data: body,
    }
    return await axios(call)
  }
  
  getBooks = async () => {
    const response = await this.apiCall(GET, '/books')
    if(!response) {
      return
    }
    this.setState({ books: response.data });
  }

  createBook = async () => {
    const {
      title,
      description,
      image,
    } = this.state
    if(!title || !description || !image) {
      console.log('failed sanity: ', title, description, image)
      return
    }
    let response;
    try {
      response = await this.apiCall(POST, '/books', {title: title, description: description, image: image})
    } catch(error) {
      console.log(error.message);
    } finally {
      console.log(response)
      if(response.status) {
        this.setState({
          books: [...this.state.books, response.data]
        })
      } else {
        console.warn('This is not expected!', response)
      }
    }
  }
  
  handleDeleteBook = async id => {
    try {
      await this.apiCall(DELETE, `/books/${id}`)
      const newBooks = [...this.state.books]
      this.setState({
        books: newBooks.filter(book => book._id !== id)
      })
    } catch(error) {
      console.log(error.message);
    }
  }

  handleUpdateBook = async (id, updatedBook) => {
    try{
      await this.apiCall(PUT, `/books/${id}`, updatedBook)
      const newBooks = [...this.state.books].map(book => {
        if(book._id !== id) {
          //we don't want to modify these
          return book
        }
        for(let key in updatedBook) {
          book[key] = updatedBook[key];
        }
        return book;
      });
      this.setState({
        books: newBooks,
      })
    }catch(error){
      console.error(error);
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

  openAddModal = () => {
    this.setState({
      addModalShown: true,
    })
  }
  
  closeModal = () => {
    this.setState({
      addModalShown: false,
      updateModalShown: false,
    })
  }

  deleteBook = (id) => {
    if(this.state.carouselIndex !== 0) {
      this.setState({carouselIndex: this.state.carouselIndex -1})
    }
    this.handleDeleteBook(id);
  }

  updateFormState = (event, value) => {
    const newState = {};
    console.log(value, ':', event.target.value)
    newState[value] = event.target.value;
    this.setState(newState);
  }

  componentDidMount() {
    if (this.props.auth0.isAuthenticated) {
      this.getBooks()
    }
  }

  render() {
    if(!this.state.books.length){
      return (
        <>
          <div className='noBooks'>
            {this.props.auth0.isAuthenticated ? (
              "No books found..."
            ) : (
              "Log in to add your favorite books."
            )}
          </div>
          <div className='add-book'>
            <Button variant="primary" onClick={this.openAddModal}>Add a Book</Button>
          </div>
          <AddBook
            show={this.state.addModalShown}
            createBook={this.createBook}
            closeModal={this.closeModal}
            updateFormState={this.updateFormState} />
        </>
      )
    }
    const selectedBook = this.state.books[this.state.carouselIndex];
    console.log(this.state.books)
    return (
      <>
        <Carousel
          interval={null}
          activeIndex={this.state.carouselIndex}
          onSelect={this.carouselSelect}>
          {this.state.books.map(book => (
            <Carousel.Item key={book._id}>
              <img
                src={carouselBackground}
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
        
        <UpdateBook
          id={selectedBook?._id}
          title={this.state.title}
          description={this.state.description}
          show={this.state.updateModalShown}
          closeModal={this.closeModal}
          handleUpdateBook={this.handleUpdateBook}
          updateFormState={this.updateFormState} />
        <AddBook
          show={this.state.addModalShown}
          createBook={this.createBook}
          closeModal={this.closeModal}
          updateFormState={this.updateFormState} />
        <div className='add-book'>
          <Button variant="primary" onClick={this.openAddModal}>Add a Book</Button>
        </div>
      </>
    );
  }
};

export default withAuth0(BestBooks);
