import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import "./style.css";
import axios from "axios";
import Results from "../components/Results";

class Search extends Component {
  state = {
    books: [],
    searchTitle: "",
    title: "",
    authors: "",
    description: "",
    image: "",
    link: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          this.state.searchTitle +
          "&key=AIzaSyAX3TqovnM8kzt0QG_BD4R5gTwjLngZJPg"
      )
      .then(response => {
        this.setState({
          books: [response.data.items]
        });

        console.log(this.state.books);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

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
          <Col size="12">
            <Jumbotron>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Results key={book.id}><strong>{book.kind}</strong></Results>
                    
                  ))}
                </List>
              ) : (
                <h3>Search to get started.</h3>
              )}
            </Jumbotron>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Search;
