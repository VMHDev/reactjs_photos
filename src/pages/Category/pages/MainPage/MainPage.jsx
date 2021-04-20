import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { BsPlusSquareFill } from 'react-icons/bs';

import Banner from 'components/Banner';
import Images from 'constants/images';
import CategoryTable from 'pages/Category/components/CategoryTable';
import { removeCategory } from 'redux/categorySlice';

import { PATH_CATEGORIES } from 'constants/route';

const MainPage = (props) => {
  const categories = useSelector((state) => state.categories);
  const history = useHistory();
  const dispatch = useDispatch();

  // Hander Events
  const handlePhotoEditClick = (category) => {
    history.push(PATH_CATEGORIES + category.id);
  };

  const handlePhotoRemoveClick = (category) => {
    const removePhotoId = category.id;
    const action = removeCategory(removePhotoId);
    dispatch(action);
  };

  // Render GUI
  const iconStyles = { color: '#0275d8', fontSize: '3.0em' };
  const tooltipStyles = { fontSize: '20px' };

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className='photo-main text-right'>
      <Banner title='List category 🎉' backgroundUrl={Images.PINK_BG} />

      <Container>
        <div className='py-5'>
          <Link to='/categories/add' id='AddNewCategory'>
            <BsPlusSquareFill style={iconStyles} />
          </Link>
          <Tooltip
            placement='left'
            isOpen={tooltipOpen}
            target='AddNewCategory'
            toggle={toggle}
            style={tooltipStyles}>
            Add new photo
          </Tooltip>
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
