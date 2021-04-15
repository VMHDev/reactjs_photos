import React from 'react';

import RegisterForm from 'pages/User/components/RegisterForm';
import Banner from 'components/Banner';

// Constants
import Images from 'constants/images';

// Styles
import './styles.scss';

const Register = (props) => {
  const initialValues = { name: '', email: '', password: '', confirmPassword: '' };
  return (
    <div className='register'>
      <Banner title='Register 🔥' backgroundUrl={Images.BRIDGE2_BG} />
      <div className='register__form'>
        <RegisterForm initialValues={initialValues} />
      </div>
    </div>
  );
};

Register.propTypes = {};

export default Register;
