import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import { useSelector } from 'react-redux';

// Constants
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_USER_LOGIN,
  PATH_USER_ACCOUNT,
} from 'constants/route';

// Styles
import './styles.scss';

const Header = (props) => {
  const { onLogoutClick } = props;

  const loginID = useSelector((state) => state.users.login);
  const dataUsers = useSelector((state) => state.users.data);
  const userFound = dataUsers.find((user) => user.id === loginID);

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
        {loginID !== '' ? (
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              {userFound.name}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link to={PATH_USER_ACCOUNT} className='link'>
                  Account
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to='' onClick={onLogoutClick} className='link'>
                  Logout
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <NavLink href={PATH_USER_LOGIN}>Login</NavLink>
        )}
      </Navbar>
    </div>
  );
};

Header.propTypes = {
  onLogoutClick: PropTypes.func,
};

Header.defaultProps = {
  onLogoutClick: null,
};

export default Header;
