import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Base64 } from 'js-base64';

import { updateStatusLogin } from 'redux/userSlice';
import LoginForm from 'pages/User/components/LoginForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PATH_HOME } from 'constants/route';

// Styles
import './styles.scss';

// Main
const LoginPage = (props) => {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    email: '',
    password: '',
  };

  // Handle events
  const handleSubmit = async (values) => {
    try {
      const userFound = users.find(
        (user) =>
          user.email === values.email &&
          user.password === Base64.encode(values.password)
      );
      if (userFound) {
        const action = updateStatusLogin(true);
        dispatch(action);
        history.push(PATH_HOME);
      } else {
        alert('Login Fail');
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className='login'>
      <Banner title='Login 🎉' backgroundUrl={Images.BRIDGE_BG} />
      <div className='login__form'>
        <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
