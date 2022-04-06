import { Component } from "react";
import { Form, Button } from 'react-bootstrap/'

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    }
  }

  createBook = event => {
    event.preventDefault();
    this.props.createBook(this.state.title, this.state.description)
  }

  render() {
    return (
    <Form onSubmit={() => this.createBook()} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Create A New Book?</Form.Label>
        <Form.Control onChange={event => this.setState({title: event.target.value})} type="text" placeholder="Enter book name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Description</Form.Label>
        <Form.Control onChange={event => this.setState({description: event.target.value})} type="text" placeholder="Enter a Description of this book." />
      </Form.Group>
      <Button type="submit">CREATE BOOK</Button>
    </Form>
    )
  }
};

export default AddBook;
