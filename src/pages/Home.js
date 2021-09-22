import NavBar from '../components/layout/NavBar';
import NoCookbook from '../components/UI/NoCookbook';
import useRequest from '../hooks/useRequest';
import { useEffect, useContext } from 'react';
import AuthContext from '../store/auth-context';
import AddRecipe from '../components/UI/AddRecipe';
import CookbookContext from '../store/cookbook-context';

const Home = (props) => {
  const { isLoading, error, sendRequest } = useRequest();
  const authCtx = useContext(AuthContext);
  const cookbookCtx = useContext(CookbookContext);

  const loadCookbookData = (data) => {
    cookbookCtx.setData(data);
  };

  const getCookbookData = (id) => {
    sendRequest(
      {
        url: '/cookbooks/' + id + '.json?auth=' + authCtx.token,
      },
      loadCookbookData
    );
  };

  useEffect(() => {
    const loadUserData = (data) => {
      authCtx.setData(data);
      if (data.cookbooks && data.cookbooks.length > 0) {
        cookbookCtx.setData({ id: data.cookbooks[0] });
        getCookbookData(data.cookbooks[0]);
      }
    };
    sendRequest(
      {
        url: '/users/' + authCtx.userId + '.json?auth=' + authCtx.token,
      },
      loadUserData
    );
  }, []);

  console.log(cookbookCtx.recipes);

  return (
    <>
      <NavBar />
      {error && <div className={'text-center mt-2 text-danger'}>{error}</div>}
      {isLoading && <p className={'text-center'}>Please wait...</p>}
      {!isLoading && authCtx.cookbooks.length === 0 && <NoCookbook />}
      {!isLoading &&
        authCtx.cookbooks.length > 0 &&
        cookbookCtx.recipes.length === 0 && <AddRecipe />}
      {!isLoading &&
        authCtx.cookbooks.length > 0 &&
        cookbookCtx.recipes.length > 0 && <p>Choose a recipe</p>}
    </>
  );
};
export default Home;
