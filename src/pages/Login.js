import NavBar from '../components/layout/NavBar';
import Carousel from '../components/layout/Carousel';
import LoginForm from '../components/layout/LoginForm';
import SignUpForm from '../components/layout/SignUpForm';
import { useState } from 'react';
const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  return (
    <>
      <NavBar></NavBar>
      <div className={'container-fluid'}>
        <div className={'row gx-1'}>
          <Carousel></Carousel>
          {!showSignUp && <LoginForm showSignup={toggleSignUp}></LoginForm>}
          {showSignUp && <SignUpForm showLogin={toggleSignUp}></SignUpForm>}
        </div>
      </div>
    </>
  );
};
export default Login;
