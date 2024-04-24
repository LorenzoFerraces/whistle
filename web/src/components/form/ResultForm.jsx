import { useState, useContext } from 'react';
import { AuthContext } from '../../api/AuthContext';
import './Form.css';

const ResultForm = ({ tournamentId, teams, close, setTournament }) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [goals1, setGoals1] = useState(0);
  const [goals2, setGoals2] = useState(0);
  const [success, setSuccess] = useState(false);
  const { setError, postTornamentResult } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!team1 || !team2) {
      setError('Please select 2 teams.');
      return;
    }
    if (team1 == team2) {
      setError('Please select 2 different teams.');
      return;
    }
    const goals1Int = parseInt(goals1);
    const goals2Int = parseInt(goals2);
    if (goals1Int < 0 || goals2Int < 0) {
      setError('Plese add a valid score.');
      return;
    }
    postTornamentResult(
      tournamentId,
      team1,
      team2,
      goals1,
      goals2,
      setTournament,
      setSuccess,
    );
    close();
  };

  return (
    <div className="simple-form">
      <div className="element">
        <h3>ADD RESULT</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <div>TEAM 1</div>
            <select value={team1} onChange={(e) => setTeam1(e.target.value)}>
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.name} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>GOALS</div>
            <input
              type="number"
              value={goals1}
              onChange={(e) => setGoals1(e.target.value)}
            />
          </div>
          <div>
            <div>TEAM 2</div>
            <select value={team2} onChange={(e) => setTeam2(e.target.value)}>
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.name} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>GOALS</div>
            <input
              type="number"
              value={goals2}
              onChange={(e) => setGoals2(e.target.value)}
            />
          </div>
          <button type="submit">ADD</button>
        </form>
      </div>
    </div>
  );
};

export default ResultForm;
