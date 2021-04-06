import React from 'react';
import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, updatePhoto } from 'redux/photoSlice';
import { useHistory, useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

AddEditPage.propTypes = {};

function AddEditPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  console.log('photoId', photoId);
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

  const handleSubmit = (values) => {
    return new Promise((resolve) => {
      console.log('Form submit: ', values);

      setTimeout(() => {
        if (isAddMode) {
          const action = addPhoto(values);
          console.log({ action });
          dispatch(action);
        } else {
          const action = updatePhoto(values);
          console.log({ action });
          dispatch(action);
        }

        history.push('/photos');
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className='photo-edit'>
      <Banner title='Pick your amazing photo 😎' />

      <div className='photo-edit__form'>
        <PhotoForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddEditPage;
