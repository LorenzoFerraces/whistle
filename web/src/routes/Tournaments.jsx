import { useContext, useEffect, useState } from 'react';
import Menu from '../components/menu/Menu';
import { AuthContext } from '../api/AuthContext';
import AddTournamentButton from '../components/buttons/AddTournamentButton';
import TournamentList from '../components/tournamentList/TournamentList';
import FilterTournaments from '../components/filter/FilterTournaments';

const Tournaments = () => {
  const [user, setUser] = useState([]);
  const [success, setSuccess] = useState(false);
  const [tournaments, setTournaments] = useState();
  const { getUser, userInfo, userLoad } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!userLoad) {
        return;
      }
      await getUser(userInfo.id, setUser, setTournaments, setSuccess);
    };
    fetchData();
  }, [userLoad, getUser, userInfo]);
  return (
    <>
      <Menu />
      <div className="element main">
        <div className="header">
          <h3>My Tournaments</h3>
          {user ? (
            <FilterTournaments
              userId={user.id}
              setTournaments={setTournaments}
            />
          ) : null}
          <AddTournamentButton />
        </div>
        {success && tournaments && <TournamentList tournaments={tournaments} />}
      </div>
    </>
  );
};

export default Tournaments;
