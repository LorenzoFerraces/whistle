import { createContext, useEffect, useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ logged: false });
  const sports = ['Football', 'Volleyball', 'Handball'];
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
  };

  const postLogin = (email, password, navigate) => {
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
        navigate('/tournaments');
      })
      .catch((error) => setError(error))
      .finally(() => setUserLoad(true));
  };

  const logOut = async () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common.Authorization = '';
    setUserInfo({
      logged: false,
    });
    setUserLoad(false);
    window.location.href = '/login';
  };

  const postRegister = (email, password, username, navigate) => {
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
        navigate('/tournaments');
      })
      .catch((error) => setError(error))
      .finally(() => setUserLoad(true));
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

  const getUser = (id, setUser, setTournaments, setSucces) => {
    setSucces(false);
    setError();
    axios
      .get(url + `/user/${id}`)
      .then((response) => {
        setUser(response.data);
        setTournaments(response.data.tournaments);
      })
      .catch((error) => setError(error))
      .finally(() => setSucces(true));
  };

  const postTornament = (
    name,
    description,
    date,
    teams,
    sport,
    setTournament,
    setSucces,
  ) => {
    setSucces(false);
    setError();
    axios
      .post(url + '/tournament', {
        name,
        description,
        date,
        teams,
        sport,
      })
      .then((response) => {
        const data = response.data;
        setTournament(data);
      })
      .catch((error) => setError(error))
      .finally(() => setSucces(true));
  };

  const getTournament = (id, setTournament, setSucces) => {
    setSucces(false);
    setError();
    axios
      .get(url + `/tournament/${id}`)
      .then((response) => {
        setTournament(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => setSucces(true));
  };

  const postGame = (
    tournamentId,
    team1,
    score1,
    team2,
    score2,
    setTournament,
    setSuccess,
  ) => {
    setSuccess(false);
    setError();
    axios
      .post(url + `/tournament/${tournamentId}/games`, {
        team1,
        score1,
        team2,
        score2,
      })
      .then((response) => {
        setTournament(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => setSuccess(true));
  };

  const editGame = (
    tournamentId,
    gameId,
    team1,
    score1,
    team2,
    score2,
    setTournament,
    setSuccess,
  ) => {
    setSuccess(false);
    setError();
    axios
      .put(url + `/tournament/${tournamentId}/games/${gameId}`, {
        team1,
        score1,
        team2,
        score2,
      })
      .then((response) => {
        setTournament(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => setSuccess(true));
  };

  const closeTournament = (tournamentId, setTournaments) => {
    setError();
    axios
      .post(url + `/tournament/${tournamentId}/status`)
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => setError(error));
  };

  const getUserTournamentsSearch = (userId, sport, name, setTournaments) => {
    setError();
    axios
      .get(
        url + `/user/${userId}/tournaments/search?sport=${sport}&name=${name}`,
      )
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => setError(error));
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        userLoad,
        sports,
        postLogin,
        logOut,
        postRegister,
        setError,
        getUser,
        postTornament,
        getTournament,
        postGame,
        editGame,
        getUserTournamentsSearch,
        closeTournament,
      }}
    >
      <ToastContainer />
      {error ? errorHandler() : null}
      {children}
    </AuthContext.Provider>
  );
};
