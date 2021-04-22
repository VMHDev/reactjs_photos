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

import {
  PATH_CATEGORIES,
  PATH_USER_LOGIN,
  PATH_CATEGORIES_ADD,
} from 'constants/route';

const MainPage = (props) => {
  const loginID = useSelector((state) => state.users.login);
  const categories = useSelector((state) => state.categories);
  const history = useHistory();
  const dispatch = useDispatch();

  // Hander Events
  const handlePhotoEditClick = (category) => {
    if (loginID) {
      history.push(PATH_CATEGORIES + category.id);
    } else {
      history.push(PATH_USER_LOGIN);
    }
  };

  const handlePhotoRemoveClick = (category) => {
    if (loginID) {
      const removePhotoId = category.id;
      const action = removeCategory(removePhotoId);
      dispatch(action);
    } else {
      history.push(PATH_USER_LOGIN);
    }
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
          <Link
            to={loginID ? PATH_CATEGORIES_ADD : PATH_USER_LOGIN}
            id='AddNewCategory'>
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
