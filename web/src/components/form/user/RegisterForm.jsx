import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../api/AuthContext';
import { FormButton, SimpleInput } from '../Form';
import './UserForm.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');
  const { postRegister, setError } = useContext(AuthContext);
  const navigate = useNavigate();

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
    postRegister(email, password, username, navigate);
    setEmail('');
    setRepeatEmail('');
    setPassword('');
    setRepeatEmail('');
    setUsername('');
  };

  return (
    <div className="user-form">
      <div className="element">
        <h3>CREATE YOUR ACCOUNT</h3>
        <form>
          <div>
            <SimpleInput name={'Email'} value={email} set={setEmail} />
          </div>
          <div>
            <SimpleInput
              name={'Repeat Email'}
              value={repeatEmail}
              set={setRepeatEmail}
            />
          </div>
          <div>
            <SimpleInput name={'Password'} value={password} set={setPassword} />
          </div>
          <div>
            <SimpleInput
              name={'Repeat Passoword'}
              value={repeatPassword}
              set={setRepeatPassword}
            />
          </div>
          <div>
            <SimpleInput name={'Username'} value={username} set={setUsername} />
          </div>
          <FormButton text={'Register'} onClick={handleSubmit} />
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
