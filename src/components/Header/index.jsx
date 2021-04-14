import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './styles.scss';

const Header = () => {
  return (
    <header className='header'>
      <Container>
        <Row className='justify-content-between'>
          <Col xs='auto'>
            <a
              className='header__link header__title'
              href='https://youtube.com/easyfrontend'
              target='_blank'
              rel='noopener noreferrer'>
              Photos
            </a>
          </Col>

          <Col xs='auto'>
            <NavLink
              exact
              className='header__link'
              to='/user/login'
              activeClassName='header__link--active'>
              Login
            </NavLink>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

Header.propTypes = {};

export default Header;
