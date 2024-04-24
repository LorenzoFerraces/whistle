import Menu from '../components/menu/Menu';
import { TeamsScores } from '../components/teamsScores/TeamsScores';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../api/AuthContext';
import AddResultButton from '../components/buttons/AddResultButton';

const Tournament = () => {
  const { tournamentId } = useParams();
  const [tournament, SetTournament] = useState(null);
  const [success, setSuccess] = useState(false);
  const { getTournament } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      tournamentId &&
        (await getTournament(tournamentId, SetTournament, setSuccess));
    };
    fetchData();
  }, [tournamentId, getTournament]);

  if (!tournament) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Menu />
      <div className="element main">
        {tournament && success && <TeamsScores teams={tournament.teams} />}
        <AddResultButton
          tournamentId={tournamentId}
          teams={tournament.teams}
          setTournament={SetTournament}
        />
      </div>
    </>
  );
};

export default Tournament;
