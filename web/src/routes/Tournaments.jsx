import { useContext, useEffect, useState } from 'react';
import Menu from '../components/menu/Menu';
import TournamentList from '../components/tournament/list/TournamentList';
import { AuthContext } from '../api/AuthContext';

const Tournaments = () => {
  const [user, setUser] = useState([]);
  const [success, setSuccess] = useState(false);
  const { getUser, userInfo, userLoad } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!userLoad) {
        return;
      }
      await getUser(userInfo.id, setUser, setSuccess);
    };
    fetchData();
  }, [userLoad, getUser, userInfo]);
  return (
    <>
      <Menu />
      <div className="element main">
        {success && user.tournaments && (
          <TournamentList tournaments={user.tournaments} />
        )}
      </div>
    </>
  );
};

export default Tournaments;
