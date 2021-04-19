import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import cryptoRandomString from 'crypto-random-string';

import { addToken } from 'redux/userTokenSlice';
import ForgotPasswordForm from 'pages/User/components/ForgotPasswordForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PASSWORD_RESET_TOKEN_LENGTH, WEB_URL } from 'constants/system';
import { PATH_USER_RESETPASSWORD } from 'constants/route';

// Styles
import './styles.scss';

const ForgotPassword = (props) => {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
  };
  const [isSubmited, setIsSubmitted] = useState(false);
  const [token, setToken] = useState(false);

  // Handle events
  const handleSubmit = async (values) => {
    try {
      const userFound = users.find((user) => user.email === values.email);
      const randomString = cryptoRandomString({
        length: PASSWORD_RESET_TOKEN_LENGTH,
        type: 'base64',
      });
      setToken(userFound.id + '-' + randomString);
      const objToken = {
        id: uuidv4(),
        user_id: userFound.id,
        token,
        delete_flg: false,
        registered_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      const action = addToken(objToken);
      await dispatch(action);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
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
        {isSubmited ? (
          <>
            <span>Step next click link: </span>
            <NavLink to={PATH_USER_RESETPASSWORD + token}>
              {WEB_URL + PATH_USER_RESETPASSWORD + token}
            </NavLink>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
