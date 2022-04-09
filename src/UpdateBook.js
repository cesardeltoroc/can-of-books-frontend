import { Component } from "react";
import { Modal, Form, Button } from 'react-bootstrap/'

class UpdateBook extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
    }
  }

  updateFormState = (event, value) => {
    const newState = {};
    newState[value] = event.target.value;
    this.setState(newState);
  }

  updateBook = event => {
    event.preventDefault();
    this.props.handleUpdateBook(this.props.id, {
      title: this.state.title,
      description: this.state.description,
    })
    event.target.reset();
    this.props.closeModal();
  }

  onShow = () => {
    this.setState({
      title: this.props.title,
      description:this.props.description,
    })
  }

  render() {
    return(
      <Modal show={this.props.show} onHide={this.props.closeModal} onShow={this.onShow} >
        <Form onSubmit={this.updateBook} >
        <Modal.Header closeButton>
          <Modal.Title>Updating {this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Rename Book</Form.Label>
            <Form.Control onChange={event => this.updateFormState(event, 'title')} type="text" value={this.state.title} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Give us a Different description</Form.Label>
            <Form.Control onChange={event => this.updateFormState(event, 'description')} type="text" value={this.state.description} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.closeModal()}>Close</Button>
          <Button variant="primary" type="submit">UPDATE BOOK</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }
};

export default UpdateBook;
