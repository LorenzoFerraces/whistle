import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../api/AuthContext';
import './Menu.css';

const Menu = () => {
  const { userInfo, logOut } = useContext(AuthContext);

  return (
    <header id="main-menu">
      <NavLink to="/">
        <div className="left">
          <span></span>
        </div>
      </NavLink>
      <div className="center">
        <NavLink to="/tournaments">
          <span>WHISTLE</span>
        </NavLink>
      </div>
      <div className="right">
        {userInfo.logged ? (
          <a onClick={() => logOut()}>
            <span>Log Out</span>
          </a>
        ) : (
          <NavLink to="/login">
            <span>Log In</span>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Menu;
