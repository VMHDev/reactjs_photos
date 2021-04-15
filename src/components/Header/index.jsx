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

// Constants
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_USER_LOGIN,
} from 'constants/route';

// Styles
import './styles.scss';

const Header = (props) => {
  const isLogin = false;
  // Render GUI
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavbarBrand href={PATH_HOME}>PHOTO APPS</NavbarBrand>
            <NavItem>
              <NavLink href={PATH_PHOTOS}>Photo</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={PATH_CATEGORIES}>Category</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        {isLogin ? (
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              User Name
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <NavLink href={PATH_USER_LOGIN}>Login</NavLink>
        )}
      </Navbar>
    </div>
  );
};

Header.propTypes = {};

export default Header;
