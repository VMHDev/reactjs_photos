import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, Tooltip } from 'reactstrap';
import { BsPlusSquareFill } from 'react-icons/bs';

import Banner from 'components/Banner';
import Images from 'constants/images';
import PhotoList from 'pages/Photo/components/PhotoList';
import { removePhoto } from 'redux/photoSlice';

import { PATH_PHOTOS } from 'constants/route';

const MainPage = (props) => {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos);
  const history = useHistory();

  // Hander Events
  const handlePhotoEditClick = (photo) => {
    history.push(PATH_PHOTOS + photo.id);
  };

  const handlePhotoRemoveClick = async (photo) => {
    console.log('Remove: ', photo);
    const removePhotoId = photo.id;
    const action = removePhoto(removePhotoId);
    await dispatch(action);
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
          <Link to='/photos/add' id='AddNewPhoto'>
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
