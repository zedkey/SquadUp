import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import "./App.css";
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated : false
    }
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({isAuthenticated : true});
  }

  handleLogout = (event) => {
    this.setState({isAuthenticated : false });
  }

  render() {
    const childProps = {
      isAuthenticated : this.state.isAuthenticated,
      userHasAuthenticated : this.userHasAuthenticated
    };

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">All</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {
                this.state.isAuthenticated 
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment>
                  <LinkContainer to="/register">
                    <NavItem>Register</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default App;
