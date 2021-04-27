import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, Tooltip } from 'reactstrap';
import { BsPlusSquareFill } from 'react-icons/bs';
import { useCookies } from 'react-cookie';

import Banner from 'components/Banner';
import ModalYesNoCancel from 'components/Modal/ModalYesNoCancel';
import PhotoList from 'pages/Photo/components/PhotoList';
import { removePhoto } from 'redux/photoSlice';
import { showModalOk, showModalYesNoCancel } from 'redux/appSlice';

import { PATH_PHOTOS, PATH_PHOTOS_ADD, PATH_USER_LOGIN } from 'constants/route';
import Images from 'constants/images';

const MainPage = (props) => {
  const photos = useSelector((state) => state.photos);
  const dispatch = useDispatch();
  const history = useHistory();

  const [photoSelected, setPhotoSelected] = useState(null);

  // Get cookie
  const [cookies] = useCookies(['login']);

  // Hander Events
  const handlePhotoEditClick = (photo) => {
    if (cookies?.login) {
      history.push(PATH_PHOTOS + photo.id);
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Photo_Edit' },
      });
    }
  };

  const handlePhotoRemoveClick = (photo) => {
    if (cookies?.login) {
      setPhotoSelected(photo);
      dispatch(
        showModalYesNoCancel({
          title: 'Confirm',
          content: 'Are you sure you want to delete this item?',
        })
      );
    } else {
      history.push({
        pathname: PATH_USER_LOGIN,
        state: { type: 'Photo_Remove' },
      });
    }
  };

  // Modal
  const handleClickYes = () => {
    try {
      const removePhotoId = photoSelected.id;
      const action = removePhoto(removePhotoId);
      dispatch(action);
      // Close modal
      dispatch(showModalYesNoCancel({ title: '', content: '' }));
    } catch (error) {
      dispatch(
        showModalOk({ title: 'Notification', content: 'Delete failed' })
      );
      console.log(error);
    }
  };

  const handleClickNo = () => {
    dispatch(showModalYesNoCancel({ title: '', content: '' }));
  };

  // Render GUI
  const iconStyles = { color: '#0275d8', fontSize: '3.0em' };
  const tooltipStyles = { fontSize: '20px' };

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const pathAdd = cookies?.login ? PATH_PHOTOS_ADD : PATH_USER_LOGIN;

  return (
    <Fragment>
      <div className='photo-main'>
        <Banner title='My photos 🎉' backgroundUrl={Images.BLUE_BG} />

        <Container className='text-center'>
          <div className='py-5 text-right'>
            <Link
              to={{
                pathname: pathAdd,
                state: { type: 'Photo_Add' },
              }}
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
      <ModalYesNoCancel
        onClickYes={handleClickYes}
        onClickNo={handleClickNo}></ModalYesNoCancel>
    </Fragment>
  );
};

MainPage.propTypes = {};

export default MainPage;
