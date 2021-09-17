import useRequest, { JSONHeader } from '../../hooks/useRequest';
import AuthContext from '../../store/auth-context';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router';

const LoginForm = (props) => {
  const emailRef = useRef();
  const passRef = useRef();
  const history = useHistory();
  const { isLoading, error, sendRequest: sendLoginRequest } = useRequest();
  const authCtx = useContext(AuthContext);

  const finishLogin = (loginData) => {
    const expirationTime = new Date(
      new Date().getTime() + +loginData.expiresIn * 1000
    );
    console.log(loginData);
    authCtx.login(
      loginData.email,
      loginData.idToken,
      expirationTime.toISOString()
    );
    history.replace('/');
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passRef.current.value.trim();
    if (email === '') {
      emailRef.current.focus();
      return;
    }
    if (password === '') {
      passRef.current.focus();
      return;
    }
    sendLoginRequest(
      {
        url: ':signInWithPassword?key=AIzaSyDFhU89lkV-fjqgy3y9KpDRkI3k66Aw88s',
        requestType: 'Identity',
        method: 'POST',
        headers: JSONHeader,
        body: { email: email, password: password, returnSecureToken: true },
      },
      finishLogin
    );
  };

  return (
    <div className={'col glasspanel p-2'}>
      <div className={'card bg-light card-form h-100 w-100'}>
        <form className={'card-body'} onSubmit={onSubmitHandler}>
          <h3>Please Login</h3>
          <div className={'form-floating'}>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className={'form-control form-control-lg mt-2'}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={'form-floating'}>
            <input
              type="password"
              id="password"
              ref={passRef}
              className={'form-control form-control-lg mt-2'}
            />
            <label htmlFor="password">Password</label>
          </div>
          {error && (
            <div className={'text-center mt-2 text-danger'}>{error}</div>
          )}
          <div className={'text-center'}>
            {!isLoading && (
              <input
                className={'btn btn-success mt-3 w-100 btn-block text-light'}
                type="submit"
                value="Login"
              ></input>
            )}
            {isLoading && <p>please wait...</p>}
          </div>
        </form>
        <div className={'card-footer bg-transparent'}>
          <div onClick={props.showSignup} className={'btn text-dark'}>
            Don't have an accout? Click Here
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
