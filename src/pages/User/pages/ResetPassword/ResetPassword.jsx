import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Base64 } from 'js-base64';

import { addUser } from 'redux/userSlice';
import ResetPasswordForm from 'pages/User/components/ResetPasswordForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';

// Styles
import './styles.scss';

const ResetPassword = (props) => {
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
    <div className='reset-password'>
      <Banner title='Reset Password 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='reset-password__form'>
        <ResetPasswordForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
