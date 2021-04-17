import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Base64 } from 'js-base64';

import { addUser } from 'redux/userSlice';
import ForgotPasswordForm from 'pages/User/components/ForgotPasswordForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';

// Styles
import './styles.scss';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    id: uuidv4(),
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Handle events
  const handleSubmit = async (values) => {
    try {
      let objUser = { ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);
      const action = addUser(objUser);
      await dispatch(action);
      history.push(PATH_USER_LOGIN);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className='forgot-password'>
      <Banner title='Forgot Password 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='forgot-password__form'>
        <ForgotPasswordForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
