import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Form.css';
import { AuthContext } from '../../api/AuthContext';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');
  const [success, setSuccess] = useState(false);
  const { postRegister, setError } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!email || !password || !username) {
      setError('Please fill out all fields.');
      return;
    }
    if (email != repeatEmail) {
      setError('Email disparity.');
      return;
    }
    if (password != repeatPassword) {
      setError('Password disparity.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    postRegister(email, password, username, setSuccess);
    setEmail('');
    setRepeatEmail('');
    setPassword('');
    setRepeatEmail('');
    setUsername('');
  };

  return (
    <div className="simple-form">
      <div className="element">
        <h3>CREATE YOUR ACCOUNT</h3>
        <form>
          <div>
            <div>EMAIL</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div>REPEAT EMAIL</div>
            <input
              type="text"
              value={repeatEmail}
              onChange={(e) => setRepeatEmail(e.target.value)}
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
          <div>
            <div>REPEAT PASSWORD</div>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div>
            <div>USERNAME</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Register
          </button>
        </form>
        <div className="nav">
          Already Have An Account?{' '}
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
