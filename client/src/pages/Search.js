import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import "./style.css";

const books = require("google-books-search");

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
  
  handleFormSubmit = event => {
    let currentComponent = this;
    event.preventDefault();
    books.search(this.state.searchTitle, function(error, results) {
      if (!error) {
        currentComponent.setState({
          books: currentComponent.state.books.concat(results)
        })
        console.log(currentComponent.state.books);
      } else {
        console.log(error);
      }
    })
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>React Google Books API Search</h1>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
        <Container fluid id="formContainer">
          <Row>
            <Col size="md-12">
              <form>
                <Input
                  value={this.state.searchTitle}
                  onChange={this.handleInputChange}
                  name="searchTitle"
                  placeholder="Title (required)"
                />
                <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
              </form>
            </Col>
          </Row>
          <Container fluid>
          <Col size="12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                      <img className="imgThumb" src={book.thumbnail} alt={book.alt} />
                      
                      <strong>
                        {book.title} by {book.authors}
                        <br></br><br></br>
                        <button href={book.link}>Link</button>
                      </strong><br></br><br></br>
                      <p>{book.description}</p>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Container>
        </Container>
      </div>
    );
  }
}
export default Search;
