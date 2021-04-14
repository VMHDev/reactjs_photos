import React from 'react';
import LoginForm from 'pages/User/components/LoginForm';
import './styles.scss';

const LoginPage = (props) => {
  const initialValues = {};
  return (
    <div className='login'>
      <div className='login__form'>
        <LoginForm initialValues={initialValues} />
      </div>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
