import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategory } from 'redux/categorySlice';
import { useHistory, useParams } from 'react-router';

import Banner from 'components/Banner';
import CategoryForm from 'pages/Category/components/CategoryForm';

import { PATH_CATEGORIES } from 'constants/route';

import './styles.scss';

const AddEditPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categoryId } = useParams();
  console.log('categoryId', categoryId);
  const isAddMode = !categoryId;

  const editedCategory = useSelector((state) => {
    const foundCategory = state.categories.find(
      (x) => x.id.toString() === categoryId
    );
    console.log({ categories: state.categories, categoryId, foundCategory });
    return foundCategory;
  });

  const maxCategories = useSelector((state) => {
    let max = Math.max.apply(
      Math,
      state.categories.map((object) => object.id)
    );
    console.log('maxID', max);
    return max;
  });

  const initialValues = isAddMode
    ? {
        id: maxCategories + 1,
        name: '',
      }
    : editedCategory;

  const handleSubmit = async (values) => {
    try {
      console.log('Form submit: ', values);
      if (isAddMode) {
        const action = addCategory(values);
        await dispatch(action);
      } else {
        const action = updateCategory(values);
        await dispatch(action);
      }
      history.push(PATH_CATEGORIES);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className='category-edit'>
      <Banner
        title={isAddMode ? 'Add new category 🛍️' : 'Update category 🛍️'}
      />

      <div className='category-edit__form'>
        <CategoryForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

AddEditPage.propTypes = {};

export default AddEditPage;
