import useRequest, { JSONHeader } from '../../hooks/useRequest';
import AuthContext from '../../store/auth-context';
import { useRef, useContext } from 'react';

const NoCookbook = () => {
  const nameRef = useRef();
  const { isLoading, error, sendRequest } = useRequest();
  const authCtx = useContext(AuthContext);

  const doneAddingCookbookHandler = (responseData) => {
    authCtx.setData({ cookbooks: responseData });
  };

  const cookbookResponseHandler = (responseData) => {
    let cookbooks = authCtx.cookbooks;
    cookbooks.push(responseData.name);
    sendRequest(
      {
        url: '/users/' + authCtx.userId + '/.json?auth=' + authCtx.token,
        method: 'PATCH',
        headers: JSONHeader,
        body: {
          cookbooks: cookbooks,
        },
      },
      doneAddingCookbookHandler
    );
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameRef.current.value.trim();
    if (name === '') {
      nameRef.current.focus();
      return;
    }
    sendRequest(
      {
        url: '/cookbooks.json?auth=' + authCtx.token,
        method: 'POST',
        headers: JSONHeader,
        body: {
          name: name,
          created: new Date().toDateString(),
          owner: authCtx.name,
        },
      },
      cookbookResponseHandler
    );
  };
  return (
    <div className={'container-fluid'}>
      <div className={'col glasspanel p-2'}>
        <div className={'card bg-light card-form h-100 w-100'}>
          <form className={'card-body'} onSubmit={onSubmitHandler}>
            <h3 className={'text-center'}>Welcome!</h3>
            <p>
              We are happy you have decided to join our family. We are dedicated
              to providing a site where users can easly access their favorite
              recipes and share them with family and friends. To get started,
              please enter your family name below and let's create your family
              cookbook!
            </p>
            <div className={'form-floating'}>
              <input
                type="text"
                ref={nameRef}
                className={'form-control form-control-lg mt-2'}
              />
              <label htmlFor="familyname" id="familynamelbl">
                Family Name
              </label>
            </div>
            {error && (
              <div className={'text-center mt-2 text-danger'}>{error}</div>
            )}
            <div className={'text-center'}>
              {!isLoading && (
                <input
                  className={'btn btn-success mt-3 w-100 btn-block text-light'}
                  type="submit"
                  value="Create Cookbook!"
                ></input>
              )}
              {isLoading && <p>please wait...</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default NoCookbook;
