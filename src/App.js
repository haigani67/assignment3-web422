import "./App.css";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import Restaurant from "./Restaurant";
import Restaurants from "./Restaurants";
import About from "./About";
import NotFound from "./NotFound";

function App() {
  const [searchString, setSearchString] = useState("");
  let history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/restaurants?borough=${searchString}`);
    setSearchString("");
  };

  return (
    <div className="App">
      <>
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>New York Restaurants</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/Restaurants">
                <Nav.Link>Full List</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/About">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form onSubmit={handleSubmit} inline>
              <FormControl
                type="text"
                placeholder="Borough"
                className="mr-sm-2"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <br />
      </>

      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <Switch>
              <Route exact path="/">
                <Redirect to="/Restaurants" />
              </Route>
              <Route exact path="/Restaurants">
                <Restaurants />
              </Route>
              <Route path="/Restaurant/:id">
                <Restaurant />
              </Route>

              <Route exact path="/About">
                <About />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
