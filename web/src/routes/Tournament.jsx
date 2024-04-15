import Menu from '../components/menu/Menu';
import { TeamsScores } from '../components/teamsScores/TeamsScores';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../api/AuthContext';

const Tournament = () => {
  const { tournamentId } = useParams();
  const [tournament, SetTournament] = useState(null);
  const [success, setSuccess] = useState(false);
  const { getTournament } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      console.log('ID ' + tournamentId);
      tournamentId &&
        (await getTournament(tournamentId, SetTournament, setSuccess));
    };
    fetchData();
  }, [tournamentId, getTournament]); // Added getTournament to dependencies

  if (!tournament) {
    return <p>Loading...</p>; // Display a loading message while waiting for data
  }
  return (
    <>
      <Menu />
      {tournament && <TeamsScores teams={tournament.teams} />}
    </>
  );
};

export default Tournament;
