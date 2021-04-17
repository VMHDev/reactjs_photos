import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';

import InputField from 'components/InputField';

const ResetPasswordForm = (props) => {
  const { initialValues, onSubmit } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('This field is required.')
      .email('This field is invalid email'),

    password: Yup.string()
      .required('This field is required.')
      .min(6, 'Min length 6 character')
      .max(20, 'Max length 20 character'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Password don't match!")
      .required('This field is required.'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name='Your email'
              component={InputField}
              label='Email'
              placeholder='your-email@mail.com'
            />

            <FastField
              name='password'
              component={InputField}
              label='New Password'
              placeholder='********'
              type='password'
            />

            <FastField
              name='confirmPassword'
              component={InputField}
              label='Confirm Password'
              placeholder='********'
              type='password'
            />

            <FormGroup>
              <Button type='submit' color='primary'>
                Submit
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

ResetPasswordForm.defaultProps = {
  onSubmit: null,
};

export default ResetPasswordForm;
