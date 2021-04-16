import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, updatePhoto } from 'redux/photoSlice';
import { useHistory, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import Banner from 'components/Banner';
import PhotoForm from 'pages/Photo/components/PhotoForm';
import Loading from 'components/Loading';
import { timeout } from 'utils/helper';

import { PATH_PHOTOS } from 'constants/route';

import './styles.scss';

const AddEditPage = (props) => {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();

  const isAddMode = !photoId;

  const editedPhoto = useSelector((state) => {
    const foundPhoto = state.photos.find((x) => x.id === photoId);
    console.log({ photos: state.photos, photoId, foundPhoto });
    return foundPhoto;
  });

  const initialValues = isAddMode
    ? {
        id: uuidv4(),
        title: '',
        categoryId: null,
        photo: '',
      }
    : editedPhoto;

  // Handle events
  const handleSubmit = async (values) => {
    setIsShow(true);
    try {
      if (isAddMode) {
        const action = addPhoto(values);
        console.log({ action });
        await dispatch(action);
        await timeout(1000);
      } else {
        const action = updatePhoto(values);
        console.log({ action });
        await dispatch(action);
        await timeout(1000);
      }
      setIsShow(false);
      history.push(PATH_PHOTOS);
      return true;
    } catch (error) {
      setIsShow(false);
      console.log(error);
      return false;
    }
  };

  // Render GUI
  return (
    <Fragment>
      <Loading isShow={isShow}>
        <div className='photo-edit'>
          <Banner title={isAddMode ? 'Add new photo 📷' : 'Update photo 📷'} />

          <div className='photo-edit__form'>
            <PhotoForm
              isAddMode={isAddMode}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </Loading>
    </Fragment>
  );
};

AddEditPage.propTypes = {};

export default AddEditPage;
