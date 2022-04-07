import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import AddBook from './AddBook';
import About from './About';
import Button from 'react-bootstrap/button'
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
const axios = require('axios');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      books: [],
      modalShown: false,
      title: '',
      description: '',
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

  getBooks = async () => {
    let url = `${process.env.REACT_APP_HEROKU}/books`
    const response = await axios.get(url);
    this.setState({books: response.data});
  }

  createBook = async () => {
    const {
      title,
      description,
    } = this.state
    if(!title || !description) {
      console.log('failed sanity: ', title, description)
      return
    }
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_HEROKU}/books`, {title: title, description: description})
    } catch(error) {
      console.log(error.message);
    } finally {
      this.setState({
        books: [...this.state.books, response.data]
      })
    }
  }
  
  handleDeleteBook = async id => {
    try {
      let url = `${process.env.REACT_APP_HEROKU}/books/${id}`;
      const response = await axios.delete(url);
      console.log(response.data);
      const newBooks = [...this.state.books]
      this.setState({
        books: newBooks.filter(book => book._id !== id)
      })
    } catch(error) {
      console.error(error);
    }
  }

  updateFormState = (event, value) => {
    const newState = {};
    newState[value] = event.target.value;
    this.setState(newState);
  }

  openModal = () => {
    this.setState({
      modalShown: true,
    })
  }
  
  closeModal = () => {
    this.setState({
      modalShown: false,
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
              <BestBooks books={this.state.books} handleDeleteBook={this.handleDeleteBook}/>
              <Button variant="primary" onClick={() => this.openModal()} >Add a Book</Button>
              <AddBook show={this.state.modalShown} createBook={this.createBook} closeModal={this.closeModal} updateFormState={this.updateFormState}/>
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
