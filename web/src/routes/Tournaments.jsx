import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../api/AuthContext';
import AddTournamentButton from '../components/buttons/AddTournamentButton';
import FilterTournaments from '../components/filter/FilterTournaments';
import TournamentList from '../components/tournament/list/TournamentList';

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
      <div className="element main">
        <div className="header">
          <h3>MY TOURNAMENTS</h3>
          <div className="center">
            {user && user.id ? (
              <FilterTournaments
                userId={user.id}
                setTournaments={setTournaments}
              />
            ) : null}
          </div>
          <div className="right">
            <AddTournamentButton />
          </div>
        </div>
        {tournaments && <TournamentList tournaments={tournaments} />}
      </div>
    </>
  );
};

export default Tournaments;
