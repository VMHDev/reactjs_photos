import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import InputField from 'components/InputField';
import * as Yup from 'yup';

const CategoryForm = (props) => {
  const { initialValues, isAddMode } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required.'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}>
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name='id'
              component={InputField}
              label='Category ID'
              placeholder=''
              disabled
            />

            <FastField
              name='name'
              component={InputField}
              label='Category Name'
              placeholder=''
            />

            <FormGroup>
              <Button type='submit' color={isAddMode ? 'primary' : 'success'}>
                {isSubmitting && <Spinner size='sm' />}
                {isAddMode ? 'Add' : 'Update'}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

CategoryForm.propTypes = {
  onSubmit: PropTypes.func,
};

CategoryForm.defaultProps = {
  onSubmit: null,
};

export default CategoryForm;
