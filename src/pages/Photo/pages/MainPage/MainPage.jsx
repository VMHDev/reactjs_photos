import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, Tooltip } from 'reactstrap';
import { BsPlusSquareFill } from 'react-icons/bs';

import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoList from 'pages/Photo/components/PhotoList';
import { removePhoto } from 'redux/photoSlice';

import { PATH_PHOTOS, PATH_PHOTOS_ADD, PATH_USER_LOGIN } from 'constants/route';

const MainPage = (props) => {
  const photos = useSelector((state) => state.photos);
  const loginID = useSelector((state) => state.users.login);
  const dispatch = useDispatch();
  const history = useHistory();

  // Hander Events
  const handlePhotoEditClick = (photo) => {
    if (loginID) {
      history.push(PATH_PHOTOS + photo.id);
    } else {
      history.push(PATH_USER_LOGIN);
    }
  };

  const handlePhotoRemoveClick = (photo) => {
    if (loginID) {
      const removePhotoId = photo.id;
      const action = removePhoto(removePhotoId);
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
    <div className='photo-main'>
      <Banner title='My photos 🎉' backgroundUrl={Images.BLUE_BG} />

      <Container className='text-center'>
        <div className='py-5 text-right'>
          <Link
            to={loginID ? PATH_PHOTOS_ADD : PATH_USER_LOGIN}
            id='AddNewPhoto'>
            <BsPlusSquareFill style={iconStyles} />
          </Link>
          <Tooltip
            placement='left'
            isOpen={tooltipOpen}
            target='AddNewPhoto'
            toggle={toggle}
            style={tooltipStyles}>
            Add new photo
          </Tooltip>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;
