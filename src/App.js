import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import AddBook from './AddBook';
import About from './About';
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

  createBook = async (title, description) => {
    let response
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

  
  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              <AddBook createBook={this.createBook}/>
              {/* PLACEHOLDER: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              <BestBooks books={this.state.books} />
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
