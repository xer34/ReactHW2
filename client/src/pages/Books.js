import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import "./style.css";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    synopsis: "",
    link: ""
  };

  componentDidMount() {
    this.loadBooks();
         
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({
          books: res.data,
          // title: "",
          // author: "",
          // synopsis: "",
          // description: "",
          // image: "",
          // link: ""
        })
      )
      .then(console.log(this.state.books))
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    console.log(id);
    // API.deleteBook(id)
    //   .then(res => this.loadBooks())
    //   .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Col size="12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    <img
                      src={book.thumbnail}
                      alt={book.alt}
                      className="imgThumb"
                    />
                    <strong>
                      {book.title} by {book.authors}
                      <br />
                      <br />
                      <button href={book.link}>Link</button>
                    </strong>
                    <br />
                    <br />
                    <p>{book.description}</p>
                    <DeleteBtn onClick={() => this.deleteBook()} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <div>
                <h1>No Results</h1>
              </div>
            )}
          </Col>
        </Container>
      </div>
    );
  }
}

export default Books;
