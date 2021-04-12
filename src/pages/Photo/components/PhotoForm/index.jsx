import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button, FormGroup, Spinner } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import InputField from 'components/InputField';
import SelectField from 'components/SelectField';
import RandomPhotoField from 'components/RandomPhotoField';
import * as Yup from 'yup';

const LoadDataCategories = () => {
  const categories = useSelector((state) => state.categories);
  let categoriesOption = [];
  for (let item of categories) {
    console.log(item);
    const itemOptions = {
      value: item.id,
      label: item.name,
    };
    categoriesOption.push(itemOptions);
  }
  return categoriesOption;
};

const PhotoForm = (props) => {
  const { initialValues, isAddMode } = props;

  const categoriesOption = LoadDataCategories();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required.'),

    categoryId: Yup.number().required('This field is required.').nullable(),

    // Luôn luôn required
    //photo: Yup.string().required("This field is required."),

    // Chỉ required khi categoryId = 1
    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field is required.'),
      otherwise: Yup.string().notRequired(),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}>
      {(formikProps) => {
        // do something here ...
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name='title'
              component={InputField}
              label='Title'
              placeholder='Eg: Wow nature ...'
            />

            <FastField
              name='categoryId'
              component={SelectField}
              label='Category'
              placeholder="What's your photo category?"
              options={categoriesOption}
            />

            <FastField
              name='photo'
              component={RandomPhotoField}
              label='Photo'
            />

            <FormGroup>
              <Button type='submit' color={isAddMode ? 'primary' : 'success'}>
                {isSubmitting && <Spinner size='sm' />}
                {isAddMode ? 'Add to album' : 'Update your photo'}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
};

export default PhotoForm;
