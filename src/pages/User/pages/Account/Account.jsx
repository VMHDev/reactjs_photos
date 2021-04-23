import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Base64 } from 'js-base64';

import { addUser } from 'redux/userSlice';
import { UserContext } from 'contexts/UserContext';
import RegisterForm from 'pages/User/components/RegisterForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';
import { PATH_USER_LOGIN } from 'constants/route';

// Styles
import './styles.scss';

const Account = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { userLogin } = useContext(UserContext);
  console.log('userLogin', userLogin);

  const initialValues = {
    id: uuidv4(),
    name: userLogin?.name,
    email: userLogin?.email,
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

  return (
    <div className='account'>
      <Banner title='Account 🔥' backgroundUrl={Images.rainBackground} />
      <div className='account__form'>
        <RegisterForm initialValues={initialValues} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

Account.propTypes = {};

export default Account;
