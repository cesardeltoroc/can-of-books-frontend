import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import AddBook from './AddBook';
import About from './About';
import Profile from './Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
const axios = require('axios');

// api call methods, and some comment reminder
// get something back
const GET = 'get'
// update something
const PUT = 'put'
// add something new
const POST = 'post'
// remove something old
const DELETE = 'delete'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      books: [],
      addModalShown: false,
      title: '',
      description: '',
      image:'',
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  apiCall = async (method, url, body) => {
    console.log(this.props.auth0)
    if (!this.props.auth0.isAuthenticated) {
      console.log('you have no right')
      return // you have no right!
    }
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
  
    const call = {
      headers: { "Authorization": `Bearer ${jwt}` },
      method: method,
      baseURL: process.env.REACT_APP_HEROKU,
      url: url
    }

    let result
    if(body) {
      result = await axios(call, body)
    } else {
      result = await axios(call)
    }
    console.log('hi')
    return result
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
    if(!title || !description) {
      console.log('failed sanity: ', title, description)
      return
    }
    let response;
    try {
      response = this.apiCall(POST, '/books', {title: title, description: description, image: image})
    } catch(error) {
      console.log(error.message);
    } finally {
      if(response) {
        this.setState({
          books: [...this.state.books, response.data]
        })
      }
    }
  }
  
  handleDeleteBook = async id => {
    try {
      const response = this.apiCall(DELETE, `/books/${id}`)
      console.log(response.data);
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
      this.apiCall(PUT, `/books/${id}`, updatedBook)
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

  updateFormState = (event, value) => {
    const newState = {};
    // console.trace('oh boy')
    console.log(value, this.state[value])
    newState[value] = event.target.value;
    this.setState(newState);
    console.log(this.state[value])
  }

  openAddModal = () => {
    this.setState({
      addModalShown: true,
    })
  }
  
  closeModal = () => {
    this.setState({
      addModalShown: false,
    })
  }

  
  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* PLACEHOLDER: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              <BestBooks
                books={this.state.books}
                // db operations
                handleUpdateBook={this.handleUpdateBook}
                handleDeleteBook={this.handleDeleteBook}
                // book form values and updating
                show={this.state.updateModalShown}
                closeModal={this.closeModal}
                updateFormState={this.updateFormState}
                title={this.state.title}
                description={this.state.description} />
              <AddBook show={this.state.addModalShown} createBook={this.createBook} closeModal={this.closeModal} updateFormState={this.updateFormState}/>
              <div className='add-book'>
                <Button variant="primary" onClick={this.openAddModal}>Add a Book</Button>
              </div>
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
