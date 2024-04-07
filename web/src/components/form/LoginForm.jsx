import { useContext, useState } from 'react';
import { AuthContext } from '../../api/AuthContext';
import { NavLink } from 'react-router-dom';
import './Form.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const { postLogin, userInfo, error, setError, succesHandler } =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    postLogin(email, password, setSuccess);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="simple-form">
      <div className="element">
        <h3>SIGN IN</h3>
        <form>
          <div>
            <div>SIGN IN WITH EMAIL</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div>PASSWORD</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Log In
          </button>
        </form>
        <div className="nav">
          First Time in Whistle?{' '}
          <NavLink to="/register">
            <button>Register</button>
          </NavLink>
        </div>
        {userInfo.logged && error == null && success
          ? succesHandler('Login Success', '/tournaments')
          : null}
      </div>
    </div>
  );
};

export default LoginForm;
