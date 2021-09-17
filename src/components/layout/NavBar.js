import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import { useHistory } from 'react-router';
const NavBar = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  let bookName = 'Family Cookbook';
  bookName = props.bookName ? props.bookName + ' ' + bookName : bookName;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace('/login');
  };

  const loginContent = (
    <>
      <button
        className={'navbar-toggler'}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className={'navbar-toggler-icon'}></span>
      </button>
      <div className={'collapse navbar-collapse'} id="navbarSupportedContent">
        <ul className={'navbar-nav me-auto mb-2 mb-lg-0'}>
          <li className={'nav-item dropdown'}>
            <a
              className={'nav-link dropdown-toggle'}
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Explore
            </a>
            <ul className={'dropdown-menu'} aria-labelledby="navbarDropdown">
              <li>
                <a className={'dropdown-item'} href="#">
                  Breakfast
                </a>
              </li>
              <li>
                <a className={'dropdown-item'} href="#">
                  Lunch
                </a>
              </li>
              <li>
                <a className={'dropdown-item'} href="#">
                  Dinner
                </a>
              </li>
            </ul>
          </li>
          <li className={'nav-item'}>
            <a className={'nav-link'} href="login.html">
              Add
            </a>
          </li>
        </ul>
        <form className={'d-flex m-auto'}>
          <input
            className={'form-control me-2'}
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className={'btn btn-success text-light'} type="submit">
            Search
          </button>
        </form>
        <ul className={'navbar-nav ms-auto mb-2 mb-lg-0'}>
          <li className={'nav-item'}>
            <div className={'nav-link btn'} onClick={logoutHandler}>
              Logout
            </div>
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <nav className={'navbar navbar-expand-lg navbar-dark bg-primary'}>
      <div className={'container-fluid'}>
        <a className={'navbar-brand'} href="cookbook.html" target="_self">
          {bookName}
        </a>
        {authCtx.isLoggedIn && loginContent}
      </div>
    </nav>
  );
};
export default NavBar;
