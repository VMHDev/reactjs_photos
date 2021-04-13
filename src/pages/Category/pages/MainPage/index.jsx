import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import Banner from 'components/Banner';
import Images from 'constants/images';
import CategoryTable from 'pages/Category/components/CategoryTable';

const MainPage = (props) => {
  const categories = useSelector((state) => state.categories);
  const history = useHistory();

  const handlePhotoEditClick = (photo) => {
    console.log('Edit: ', photo);
    const editPhotoUrl = `/categories/${photo.id}`;
    history.push(editPhotoUrl);
  };

  const handlePhotoRemoveClick = (photo) => {
    console.log('Remove: ', photo);
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
