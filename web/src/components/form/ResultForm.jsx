import { useState, useContext } from 'react';
import { AuthContext } from '../../api/AuthContext';

const ResultForm = ({ tournamentId, close }) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [goals1, setGoals1] = useState('');
  const [goals2, setGoals2] = useState('');
  const { setError, postTornamentResult } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!team1 || !team2 || !goals1 || !goals2) {
      setError('Please fill out all fields.');
      return;
    }
    postTornamentResult(tournamentId, team1, team2, goals1, goals2, setSuccess);
    close();
  };

  return (
    <div className="simple-form">
      <div className="element">
        <h3>ADD RESULT</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <div>TEAM 1</div>
            <input
              type="text"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
            />
          </div>
          <div>
            <div>TEAM 2</div>
            <input
              type="text"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
            />
          </div>
          <div>
            <div>GOALS TEAM 1 </div>
            <input
              type="number"
              value={goals1}
              onChange={(e) => setGoals1(e.target.value)}
            />
          </div>
          <div>
            <div>GOALS TEAM 2</div>
            <input
              type="number"
              value={goals2}
              onChange={(e) => setGoals2(e.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default ResultForm;
