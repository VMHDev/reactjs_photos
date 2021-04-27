import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Base64 } from 'js-base64';

import { addLogin, removeLogin } from 'redux/cookieSlice';
import { showLoading, showModalOk } from 'redux/appSlice';
import LoginForm from 'pages/User/components/LoginForm';
import Banner from 'components/Banner';
import { timeout } from 'utils/helper';

// Constants
import Images from 'constants/images';
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_PHOTOS_ADD,
  PATH_CATEGORIES_ADD,
} from 'constants/route';

// Styles
import './styles.scss';

// Main
const LoginPage = (props) => {
  const users = useSelector((state) => state.users.data);
  const userLogin = useSelector((state) => state.cookies.login);

  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (userLogin) {
      //Logout
      const action = removeLogin(null);
      dispatch(action);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle events
  const handleSubmit = async (values) => {
    dispatch(showLoading(true));
    try {
      var isSuccess = false;
      const userFound = users.find(
        (user) =>
          user.email === values.email &&
          user.password === Base64.encode(values.password)
      );
      if (userFound) {
        const action = addLogin(userFound);
        dispatch(action);
        await timeout(1000);
        isSuccess = true;
        // Redirect pages
        const type = props.location.state?.type;
        switch (type) {
          case 'Photo_Remove':
          case 'Photo_Edit':
            history.push(PATH_PHOTOS);
            break;
          case 'Photo_Add':
            history.push(PATH_PHOTOS_ADD);
            break;
          case 'Category_Remove':
          case 'Category_Edit':
            history.push(PATH_CATEGORIES);
            break;
          case 'Category_Add':
            history.push(PATH_CATEGORIES_ADD);
            break;
          default:
            history.push(PATH_HOME);
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
    if (!isSuccess) {
      dispatch(showModalOk({ title: 'Notification', content: 'Login failed' }));
    }
    dispatch(showLoading(false));
  };

  return (
    <Fragment>
      <div className='login'>
        <Banner title='Login 🎉' backgroundUrl={Images.BRIDGE_BG} />
        <div className='login__form'>
          <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
      </div>
    </Fragment>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
