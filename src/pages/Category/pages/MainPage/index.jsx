import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Banner from 'components/Banner';
import Images from 'constants/images';
import CategoryTable from 'pages/Category/components/CategoryTable';
import { removeCategory } from 'redux/categorySlice';

const MainPage = (props) => {
  const categories = useSelector((state) => state.categories);
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePhotoEditClick = (category) => {
    const editPhotoUrl = `/categories/${category.id}`;
    history.push(editPhotoUrl);
  };

  const handlePhotoRemoveClick = (category) => {
    const removePhotoId = category.id;
    const action = removeCategory(removePhotoId);
    dispatch(action);
  };

  return (
    <div className='photo-main text-right'>
      <Banner title='Your awesome photos 🎉' backgroundUrl={Images.PINK_BG} />

      <Container>
        <div className='py-5'>
          <Link to='/categories/add'>Add new category</Link>
        </div>
        <CategoryTable
          categoryList={categories}
          onCategoryEditClick={handlePhotoEditClick}
          onCategoryRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;
