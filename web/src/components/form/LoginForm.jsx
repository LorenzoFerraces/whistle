import { useContext, useState } from 'react';
import { AuthContext } from '../../api/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import './Form.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { postLogin, setError } = useContext(AuthContext);
  const navigate = useNavigate();

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
    postLogin(email, password, navigate);
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
      </div>
    </div>
  );
};

export default LoginForm;
