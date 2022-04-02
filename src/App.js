import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
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

  render() {
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* PLACEHOLDER: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              <BestBooks />
            </Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
