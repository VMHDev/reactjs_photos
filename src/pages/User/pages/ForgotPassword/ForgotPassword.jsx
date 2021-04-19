import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import cryptoRandomString from 'crypto-random-string';

import { addToken } from 'redux/userTokenSlice';
import ForgotPasswordForm from 'pages/User/components/ForgotPasswordForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PASSWORD_RESET_TOKEN_LENGTH } from 'constants/system';

// Styles
import './styles.scss';

const ForgotPassword = (props) => {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
  };

  // Handle events
  const handleSubmit = async (values) => {
    try {
      const userFound = users.find((user) => user.email === values.email);
      const randomString = cryptoRandomString({
        length: PASSWORD_RESET_TOKEN_LENGTH,
        type: 'base64',
      });
      const token = userFound.id + '-' + randomString;
      const objToken = {
        id: uuidv4(),
        user_id: userFound.id,
        token,
        delete_flg: false,
        registered_date: moment().format('YYYY-MM-DD HH:mm:ss'),
      };
      const action = addToken(objToken);
      await dispatch(action);
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
