import NavBar from '../components/layout/NavBar';
import NoCookBook from '../components/UI/NoCookBook';
import useRequest, { JSONHeader } from '../hooks/useRequest';
import { useEffect, useContext } from 'react';
import AuthContext from '../store/auth-context';

const Home = (props) => {
  const { isLoading, error, sendRequest: fetchUserData } = useRequest();
  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   const loadUserData = (data) => {
  //     console.log(data);
  //   };
  //   fetchUserData(
  //     { url: '/cookbooks.json?email=' + authCtx.email },
  //     loadUserData
  //   );
  // }, [fetchUserData]);
  return (
    <>
      <NavBar />
      <NoCookBook />
    </>
  );
};
export default Home;
