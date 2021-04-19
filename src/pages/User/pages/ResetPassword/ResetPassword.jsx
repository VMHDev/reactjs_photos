import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Base64 } from 'js-base64';

import { addUser } from 'redux/userSlice';
import ResetPasswordForm from 'pages/User/components/ResetPasswordForm';
import Banner from 'components/Banner';
import NotFound from 'components/NotFound';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';

// Styles
import './styles.scss';

const ResetPassword = (props) => {
  const tokens = useSelector((state) => state.user_tokens);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();

  const [isTokenValid, setIsTokenValid] = useState(false);

  console.log('token', token);
  useEffect(() => {
    // Check token valid
    const tokenFound = tokens.find((item) => item.token === token);
    if (tokenFound) {
      setIsTokenValid(true);
    }
  }, [tokens, token]);

  const initialValues = {
    id: uuidv4(),
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Handle events
  const handleSubmit = (values) => {
    try {
      let objUser = { ...values };
      delete objUser.confirmPassword;
      objUser.password = Base64.encode(objUser.password);
      const action = addUser(objUser);
      dispatch(action);
      history.push(PATH_USER_LOGIN);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return isTokenValid ? (
    <div className='reset-password'>
      <Banner title='Reset Password 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='reset-password__form'>
        <ResetPasswordForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

ResetPassword.propTypes = {};

export default ResetPassword;
