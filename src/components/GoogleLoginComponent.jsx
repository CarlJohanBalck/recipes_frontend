import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginComponent = () => {
  const responseGoogle = (response) => {
    // Handle the Google login response here
  };
  return (
    <GoogleLogin
      clientId="966483056504-scnj801186vg6rmgcdttel5eps1nlc4a.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;
