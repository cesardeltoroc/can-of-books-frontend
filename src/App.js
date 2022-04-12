import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import AddBook from './AddBook';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './app.css';
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
      addModalShown: false,
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
      console.log(error.message);
    }
  }

  handleUpdateBook = async (id, updatedBook) => {
    try{
      let url = `${process.env.REACT_APP_HEROKU}/books/${id}`;
      console.log(id);
      console.log(await axios.put(url, updatedBook));
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
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
