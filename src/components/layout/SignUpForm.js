import useRequest, { JSONHeader } from '../../hooks/useRequest';
import AuthContext from '../../store/auth-context';
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SignUpForm = (props) => {
  const [pass, setPass] = useState('');
  const [passCon, setPassCon] = useState('');
  const { isLoading, error, sendRequest: sendLoginRequest } = useRequest();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [forward, setForward] = useState(false);

  useEffect(() => {
    if (forward) {
      setForward(false);
      history.replace('/');
    }
  }, [forward, history]);

  const finishLogin = () => {
    setForward(true);
  };

  const addUser = (loginData) => {
    const expirationTime = new Date(
      new Date().getTime() + +loginData.expiresIn * 1000
    );
    authCtx.login(
      loginData.localId,
      loginData.idToken,
      expirationTime.toISOString()
    );
    sendLoginRequest(
      {
        url: '/users/' + loginData.localId + '.json?auth=' + loginData.idToken,
        method: 'PUT',
        headers: JSONHeader,
        body: {
          email: authCtx.email,
          sms: authCtx.sms,
          name: authCtx.name,
          cookbooks: authCtx.cookbooks,
        },
      },
      finishLogin
    );
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (authCtx.name === '') {
      return;
    }
    if (authCtx.email === '') {
      return;
    }
    if (pass === '') {
      return;
    }
    if (pass === '') {
      return;
    }
    if (passCon !== pass) {
      return;
    }
    sendLoginRequest(
      {
        url: ':signUp?key=AIzaSyDFhU89lkV-fjqgy3y9KpDRkI3k66Aw88s',
        requestType: 'Identity',
        method: 'POST',
        headers: JSONHeader,
        body: { email: authCtx.email, password: pass, returnSecureToken: true },
      },
      addUser
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
              value={authCtx.name}
              onChange={(e) => authCtx.setData({ name: e.target.value })}
              className={'form-control form-control-lg mt-2'}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className={'form-floating'}>
            <input
              type="email"
              value={authCtx.email}
              onChange={(e) =>
                authCtx.setData({ email: e.target.value.trim() })
              }
              className={'form-control form-control-lg mt-2'}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={'form-floating'}>
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={authCtx.sms}
              onChange={(e) => authCtx.setData({ sms: e.target.value.trim() })}
              className={'form-control form-control-lg mt-2'}
            />
            <label htmlFor="sms">Text Message Number</label>
          </div>
          <div className={'form-floating'}>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className={'form-control form-control-lg mt-2'}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className={'form-floating'}>
            <input
              type="password"
              value={passCon}
              onChange={(e) => setPassCon(e.target.value)}
              className={'form-control form-control-lg mt-2'}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
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
          <div onClick={props.showLogin} className={'btn text-dark'}>
            Already have an account? Click Here
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpForm;
