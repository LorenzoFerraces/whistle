import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../api/AuthContext';
import './Menu.css';

const Menu = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <header id="main-menu">
      <NavLink to="/">
        <div className="left">
          <span>WHISTLE</span>
        </div>
      </NavLink>
      <div className="center">
        <NavLink to="/tournaments">
          <span>My Tournaments</span>
        </NavLink>
      </div>
      <div className="right">
        {userInfo.logged ? null : (
          <NavLink to="/login">
            <span>Log In</span>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Menu;
