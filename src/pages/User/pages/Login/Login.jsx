import React from 'react';

import LoginForm from 'pages/User/components/LoginForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';

// Styles
import './styles.scss';

// Main
const LoginPage = (props) => {
  const initialValues = { email: '', password: '' };
  return (
    <div className='login'>
      <Banner title='Login 🎉' backgroundUrl={Images.BRIDGE_BG} />
      <div className='login__form'>
        <LoginForm initialValues={initialValues} />
      </div>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
