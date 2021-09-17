import useRequest, { JSONHeader } from '../../hooks/useRequest';
import AuthContext from '../../store/auth-context';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router';

const SignUpForm = (props) => {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const history = useHistory();
  const { isLoading, error, sendRequest: sendLoginRequest } = useRequest();
  const authCtx = useContext(AuthContext);

  const finishLogin = (loginData) => {
    const expirationTime = new Date(
      new Date().getTime() + +loginData.expiresIn * 1000
    );
    authCtx.login(
      loginData.email,
      loginData.idToken,
      expirationTime.toISOString()
    );
    history.replace('/');
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passRef.current.value.trim();
    if (name === '') {
      nameRef.current.focus();
      return;
    }
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
        url: ':signUp?key=AIzaSyDFhU89lkV-fjqgy3y9KpDRkI3k66Aw88s',
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
          <h3>Please provide the following information</h3>
          <div className={'form-floating'}>
            <input
              type="text"
              id="name"
              ref={nameRef}
              className={'form-control form-control-lg mt-2'}
            />
            <label htmlFor="name">Name</label>
          </div>
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
                value="Create Account"
              ></input>
            )}
            {isLoading && <p>please wait...</p>}
          </div>
        </form>
        <div className={'card-footer bg-transparent'}>
          <a onClick={props.showLogin} className={'btn text-dark'}>
            Already have an account? Click Here
          </a>
        </div>
      </div>
    </div>
  );
};
export default SignUpForm;
