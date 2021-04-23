import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Base64 } from 'js-base64';

import { updateStatusLogin } from 'redux/userSlice';
import { UserContext } from 'contexts/UserContext';
import LoginForm from 'pages/User/components/LoginForm';
import Banner from 'components/Banner';
import Loading from 'components/Loading';
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
  const [isShowLoading, setIsShowLoading] = useState(false);

  const users = useSelector((state) => state.users.data);
  const { setUserLogin } = useContext(UserContext);

  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    email: '',
    password: '',
  };

  // Handle events
  const handleSubmit = async (values) => {
    setIsShowLoading(true);
    try {
      const userFound = users.find(
        (user) =>
          user.email === values.email &&
          user.password === Base64.encode(values.password)
      );
      if (userFound) {
        console.log('userFound', userFound);
        setUserLogin(userFound);
        const action = updateStatusLogin(userFound.id);
        dispatch(action);
        await timeout(1000);
        setIsShowLoading(false);
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
      } else {
        setIsShowLoading(false);
        alert('Login Fail');
      }
    } catch (error) {
      setIsShowLoading(false);
      alert('Login Fail');
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Loading isShow={isShowLoading}>
        <div className='login'>
          <Banner title='Login 🎉' backgroundUrl={Images.BRIDGE_BG} />
          <div className='login__form'>
            <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
          </div>
        </div>
      </Loading>
    </Fragment>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
