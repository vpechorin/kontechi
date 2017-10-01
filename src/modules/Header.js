import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <header>
        <LoadingBar/>

        <Navbar color="faded" light toggleable full>
          <NavbarToggler right onClick={this.toggle}/>
          <NavbarBrand href="/">eurothermwindows</NavbarBrand>
          <Collapse className="navbar-toggleable-lg" isOpen={this.state.isOpen} navbar>
            <Nav className="lg-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/e70">e70</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/e95">e95 - page</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
