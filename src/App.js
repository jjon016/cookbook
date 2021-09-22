import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AuthContext from './store/auth-context';
import { useContext } from 'react';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact>
        {!authCtx.isLoggedIn && <Redirect to="/login"></Redirect>}
        {authCtx.isLoggedIn && <Redirect to="/home"></Redirect>}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      {authCtx.isLoggedIn && (
        <Route path="/home">
          <Home />
        </Route>
      )}
      <Route path="*">
        <NotFound></NotFound>
      </Route>
    </Switch>
  );
}

export default App;
