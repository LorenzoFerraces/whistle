import { useContext, useState } from 'react';
import { AuthContext } from '../../../api/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormButton, SimpleInput } from '../Form';
import './UserForm.css';
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
    <div className="user-form">
      <div className="element">
        <h3>SIGN IN</h3>
        <form>
          <div>
            <SimpleInput
              name={'Sign in with email'}
              value={email}
              set={setEmail}
            />
          </div>
          <div>
            <SimpleInput name={'Password'} value={password} set={setPassword} />
          </div>
          <FormButton text={'Log In'} onClick={handleSubmit} />
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
