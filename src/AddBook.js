import { Component } from "react";
import { Form, Button, Modal } from 'react-bootstrap/'

class AddBook extends Component {

  createBook = event => {
    event.preventDefault();
    this.props.createBook()
    event.target.reset();
  }

  render() {
    const {
      show,
      updateFormState,
      closeModal,
    } = this.props
    return (
      <Modal show={show} onHide={() => closeModal()}>
        <Form onSubmit={e => this.createBook(e)} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Create A New Book?</Form.Label>
            <Form.Control onChange={event => updateFormState(event, 'title')} type="text" placeholder="Enter book name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book Description</Form.Label>
            <Form.Control onChange={event => updateFormState(event, 'description')} type="text" placeholder="Enter a Description of this book." />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            CREATE BOOK
            </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    )
  }
};

export default AddBook;
