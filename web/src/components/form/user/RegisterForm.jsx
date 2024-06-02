import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../api/AuthContext';
import {
  FormButton,
  FormSubmitButton,
  SecelectInput,
  SimpleInput,
  PhoneInputComponent,
} from '../Form';
import './UserForm.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [preferredSport, setPreferredSport] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');
  const { postRegister, setError, sports, locations } = useContext(AuthContext);
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
    postRegister(email, preferredSport, location, phone, password, username, navigate);
    setEmail('');
    setRepeatEmail('');
    setPreferredSport('');
    setLocation('');
    setPassword('');
    setRepeatEmail('');
    setUsername('');
  };

  return (
    <div className="user-form">
      <div className="element">
        <h3>CREATE YOUR ACCOUNT</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <SimpleInput name={'Email'} value={email} set={setEmail}/>
          </div>
          <div>
            <SimpleInput
                name={'Repeat Email'}
                value={repeatEmail}
                set={setRepeatEmail}
            />
          </div>
          <div className="small-section">
            <SecelectInput
                name={'Preferred Sport'}
                list={sports}
                value={preferredSport}
                set={setPreferredSport}
            />
          </div>
          <div className="small-section">
            <SecelectInput
                name={'Province'}
                list={locations}
                value={location}
                set={setLocation}
            />
          </div>
          <div>
            <PhoneInputComponent
                country="AR"
                value={phone}
                onChange={setPhone}/>
          </div>
          <div>
            <SimpleInput
                name={'Password'}
                type={'password'}
                value={password}
                set={setPassword}
            />
          </div>
          <div>
            <SimpleInput
                name={'Repeat Passoword'}
                type={'password'}
                value={repeatPassword}
                set={setRepeatPassword}
            />
          </div>
          <div>
            <SimpleInput name={'Username'} value={username} set={setUsername}/>
          </div>
          <FormSubmitButton text={'Register'}/>
        </form>
        <div className="nav">
          Already Have An Account?
          <NavLink to="/login">
            <FormButton text={'login'}/>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
