import Menu from '../components/menu/Menu';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../api/AuthContext';
import AddResultButton from '../components/buttons/AddResultButton';
import TeamList from '../components/teamList/TeamList';
import ShowGamesButton from '../components/buttons/ShowGamesButton';
import CloseGameButton from '../components/buttons/CloseGameButton';

const Tournament = () => {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [success, setSuccess] = useState(false);
  const { getTournament } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      tournamentId &&
        (await getTournament(tournamentId, setTournament, setSuccess));
    };
    fetchData();
  }, [tournamentId, getTournament]);

  if (!tournament) {
    return <p>Loading...</p>;
  }

  console.log(tournament);
  console.log(tournament.status);

  return (
    <>
      <Menu />
      <div className="element main">
        <div className="header">
          <h3>Tournament: {tournament ? tournament.name : null}</h3>
          <div className="buttons">
            {tournament.status && (
              <AddResultButton
                tournamentId={tournamentId}
                teams={tournament.teams}
                setTournament={setTournament}
              />
            )}

            <ShowGamesButton
              tournamentId={tournamentId}
              games={tournament.games}
              teams={tournament.teams}
              setTournament={setTournament}
              tournamentStatus={tournament.status}
            />

            {tournament.status && (
              <CloseGameButton
                tournamentId={tournamentId}
                setTournament={setTournament}
              />
            )}
          </div>
        </div>
        {tournament && success && <TeamList teams={tournament.teams} />}
      </div>
    </>
  );
};

export default Tournament;
