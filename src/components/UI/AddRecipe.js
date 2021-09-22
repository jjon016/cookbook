import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import CookbookContext from '../../store/cookbook-context';
import useRequest, { JSONHeader } from '../../hooks/useRequest';
import { v4 as uuid } from 'uuid';

const AddRecipe = () => {
  const nameRef = useRef();
  const catRef = useRef();
  const fileRef = useRef();
  const fileNameRef = useRef();
  const desRef = useRef();
  const authCtx = useContext(AuthContext);
  const cookbookCtx = useContext(CookbookContext);
  const { isLoading, error, sendRequest } = useRequest();
  let imagename = '';

  const openFileHandler = () => {
    fileRef.current.click();
  };
  const selFileHandler = () => {
    fileNameRef.current.value = fileRef.current.value;
  };
  const doneAddingRecipeToCookbookHandler = (data) => {
    console.log(data);
  };
  const doneAddingRecipeHandler = (data) => {
    console.log(data);
    let recipes = cookbookCtx.recipes;
    recipes.push(data.name);
    cookbookCtx.setData({ recipes: recipes });
    sendRequest(
      {
        url: '/cookbooks/' + cookbookCtx.id + '/.json?auth=' + authCtx.token,
        method: 'PATCH',
        headers: JSONHeader,
        body: { recipes: recipes },
      },
      doneAddingRecipeToCookbookHandler
    );
  };
  const processUpload = (data) => {
    console.log(data);
    sendRequest(
      {
        url: '/recipes.json?auth=' + authCtx.token,
        method: 'POST',
        headers: JSONHeader,
        body: {
          name: nameRef.current.value.trim(),
          tags: catRef.current.value.trim(),
          image: imagename,
          description: desRef.current.value.trim(),
        },
      },
      doneAddingRecipeHandler
    );
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (nameRef.current.value === '') {
      nameRef.current.focus();
      return;
    }
    if (fileNameRef.current.value === '') {
      fileNameRef.current.focus();
      return;
    }
    if (desRef.current.value === '') {
      desRef.current.focus();
      return;
    }
    imagename = uuid() + '.' + fileRef.current.files[0].name.split('.').pop();
    sendRequest(
      {
        url: 'images%2F' + imagename,
        requestType: 'Upload',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + authCtx.token,
        },
        postBody: fileRef.current.files[0],
      },
      processUpload
    );
  };

  return (
    <div className={'container-fluid'}>
      <div className={'col glasspanel p-2'}>
        <div className={'card bg-light card-form h-100 w-100'}>
          <form className={'card-body'} onSubmit={onSubmitHandler}>
            <h3 className={'text-center'}>First Recipe</h3>
            <p>
              Now that we have a cookbook created, let's add a recipe to it.
              Please find your favorite recipe and provide the following
              information about it:
            </p>
            <div className={'form-floating'}>
              <input
                type="text"
                ref={nameRef}
                className={'form-control form-control-lg mt-2 text-primary'}
              />
              <label>Recipe Name</label>
            </div>
            <div className={'form-floating'}>
              <input
                type="text"
                ref={catRef}
                className={'form-control form-control-lg mt-2 text-primary'}
              />
              <label>Category Hashtags</label>
            </div>
            <p>
              <small>
                *Use hashtags to place this recipe into different sections of
                your cookbook. ie #Dinner
              </small>
            </p>
            <div className={'form-floating'}>
              <input
                type="file"
                onChange={selFileHandler}
                ref={fileRef}
                className={'d-none'}
              />
              <input
                type="text"
                ref={fileNameRef}
                onClick={openFileHandler}
                className={'form-control form-control-lg mt-2 text-primary'}
              />
              <label>Recipe Image</label>
            </div>
            <div className={'form-floating'}>
              <input
                type="text"
                ref={desRef}
                className={'form-control form-control-lg mt-2 text-primary'}
              />
              <label>Recipe Description</label>
            </div>
            {error && (
              <div className={'text-center mt-2 text-danger'}>{error}</div>
            )}
            {!isLoading && (
              <input
                className={'btn btn-success mt-3 w-100 btn-block text-light'}
                type="submit"
                value="Create Recipe"
              />
            )}
            {isLoading && <p className="text-center mt-3">Please wait...</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddRecipe;
