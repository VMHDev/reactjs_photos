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
  const handleCategoryEditClick = (category) => {
    console.log('category', category);
    if (loginID) {
      history.push(PATH_CATEGORIES + category.id);
    } else {
      console.log('loginID');
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Category_Edit' },
      });
    }
  };

  const handleCategoryRemoveClick = (category) => {
    if (loginID) {
      const removePhotoId = category.id;
      const action = removeCategory(removePhotoId);
      dispatch(action);
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Category_Remove' },
      });
    }
  };

  // Render GUI
  const iconStyles = { color: '#0275d8', fontSize: '3.0em' };
  const tooltipStyles = { fontSize: '20px' };

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const pathAdd = loginID ? PATH_CATEGORIES_ADD : PATH_USER_LOGIN;

  return (
    <div className='photo-main text-right'>
      <Banner title='List category 🎉' backgroundUrl={Images.PINK_BG} />

      <Container>
        <div className='py-5'>
          <Link
            to={{
              pathname: pathAdd,
              state: { type: 'Category_Add' },
            }}
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
          onCategoryEditClick={handleCategoryEditClick}
          onCategoryRemoveClick={handleCategoryRemoveClick}
        />
      </Container>
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;
