import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import InputField from 'components/InputField';

const LoginForm = (props) => {
  const { initialValues } = props;

  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });

        return (
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
              <Button type='submit' color='primary'>
                Login
              </Button>
            </FormGroup>
          </Form>
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
