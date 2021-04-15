import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import InputField from 'components/InputField';

const RegisterForm = (props) => {
  const { initialValues } = props;

  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name='name'
              component={InputField}
              label='Name'
              placeholder='Harry Potter'
            />

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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
  onSubmit: null,
};

export default RegisterForm;
