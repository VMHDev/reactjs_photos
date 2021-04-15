import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Button, FormGroup, Row, Col } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import { NavLink } from 'react-router-dom';

import InputField from 'components/InputField';

// Constants
import { PATH_USER_REGISTER, PATH_USER_FORGOTPASSWORD } from 'constants/route';

// Main
const LoginForm = (props) => {
  const { initialValues } = props;

  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Fragment>
            <Form>
              <FastField
                name='email'
                component={InputField}
                label='Email'
                placeholder='your-email@mail.com'
              />

              <FastField
                name='password'
                component={InputField}
                label='Password'
                placeholder='********'
              />

              <FormGroup>
                <Row xs='2'>
                  <Col>
                    <Button type='submit' color='primary'>
                      Login
                    </Button>
                  </Col>
                  <Col className='align-self-center'>
                    <NavLink
                      to={PATH_USER_FORGOTPASSWORD}
                      activeClassName='selected'
                      className='float-right'>
                      Fogot Password
                    </NavLink>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
            <NavLink to={PATH_USER_REGISTER} activeClassName='selected'>
              Create new account
            </NavLink>
          </Fragment>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: null,
};

export default LoginForm;
