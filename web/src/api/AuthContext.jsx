import { createContext, useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ logged: false });
  const [userLoad, setUserLoad] = useState(false);
  const [error, setError] = useState();
  const url = 'http://localhost:8001';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `${token}`;
      getCurrentUser();
    }
  }, []);

  const errorHandler = () => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      axios.defaults.headers.common.Authorization = '';
      setUserInfo({
        logged: false,
      });
      setUserLoad(false);
      toast.error('Unauthorized', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
      window.location.href = '/login';
    }
    if (error.response) {
      toast.error(error.response.data.error, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
    toast.error(error, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
    console.log(error);
  };

  const succesHandler = (text, url) => {
    toast.success(text, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
    window.location.href = url;
  };

  const postLogin = (email, password, setSucces) => {
    setSucces(false);
    setUserLoad(false);
    setError();
    axios
      .post(url + '/login', { email, password })
      .then((response) => {
        const token = response.headers.authorization;
        axios.defaults.headers.common.Authorization = `${token}`;
        localStorage.setItem('token', token);
        const data = response.data;
        setUserInfo({
          logged: true,
          id: data.id,
          name: data.name,
        });
      })
      .catch((error) => setError(error))
      .finally(() => setSucces(true), setUserLoad(true));
  };

  const logOut = async () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = '';
    setUserInfo({
      logged: false,
    });
    setUserLoad(false);
    window.location.href = '/store';
  };

  const postRegister = (email, password, username, setSucces) => {
    setSucces(false);
    setError();
    axios
      .post(url + '/register', {
        email,
        password,
        username,
      })
      .then((response) => {
        const token = response.headers.authorization;
        axios.defaults.headers.common.Authorization = `${token}`;
        localStorage.setItem('token', token);
        const data = response.data;
        setUserInfo({
          logged: true,
          id: data.id,
          name: data.name,
        });
      })
      .catch((error) => setError(error))
      .finally(() => setSucces(true), setUserLoad(true));
  };

  const getCurrentUser = () => {
    setUserLoad(false);
    setError();
    axios
      .get(url + '/user/current')
      .then((response) => {
        const data = response.data;
        setUserInfo({
          logged: true,
          id: data.id,
          name: data.name,
        });
      })
      .catch((error) => setError(error))
      .finally(() => setUserLoad(true));
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        userLoad,
        succesHandler,
        postLogin,
        logOut,
        postRegister,
        setError,
      }}
    >
      <ToastContainer />
      {error ? errorHandler() : null}
      {children}
    </AuthContext.Provider>
  );
};
