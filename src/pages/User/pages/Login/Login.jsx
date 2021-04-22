import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Base64 } from 'js-base64';

import { updateStatusLogin } from 'redux/userSlice';
import LoginForm from 'pages/User/components/LoginForm';
import Banner from 'components/Banner';
import Loading from 'components/Loading';
import { timeout } from 'utils/helper';

// Constants
import Images from 'constants/images';
import { PATH_HOME, PATH_PHOTOS, PATH_CATEGORIES } from 'constants/route';

// Styles
import './styles.scss';

// Main
const LoginPage = (props) => {
  console.log('props', props);
  const [isShow, setIsShow] = useState(false);
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    email: '',
    password: '',
  };

  // Handle events
  const handleSubmit = async (values) => {
    setIsShow(true);
    try {
      const userFound = users.find(
        (user) =>
          user.email === values.email &&
          user.password === Base64.encode(values.password)
      );
      if (userFound) {
        const action = updateStatusLogin(userFound.id);
        dispatch(action);
        await timeout(1000);
        setIsShow(false);
        const type = props.location.state.type;
        switch (type) {
          case 'Photo_Remove':
          case 'Photo_Edit':
          case 'Photo_Add':
            history.push(PATH_PHOTOS);
            break;
          case 'Category_Remove':
          case 'Category_Edit':
          case 'Category_Add':
            history.push(PATH_CATEGORIES);
            break;
          default:
            history.push(PATH_HOME);
            break;
        }
      } else {
        setIsShow(false);
        alert('Login Fail');
      }
    } catch (error) {
      setIsShow(false);
      alert('Login Fail');
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Loading isShow={isShow}>
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
