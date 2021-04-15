import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
} from 'reactstrap';

import './styles.scss';

const Header = () => {

  // Render GUI
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavbarBrand href='/'>PHOTO APPS</NavbarBrand>
            <NavItem>
              <NavLink href='/photos'>Photo</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/categories'>
                Category
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <UncontrolledDropdown>
          <DropdownToggle nav caret>
            User Name
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Account</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>
    </div>
  );
};

Header.propTypes = {};

export default Header;
