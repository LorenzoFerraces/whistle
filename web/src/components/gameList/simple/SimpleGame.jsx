import './SimpleGame.css';
import EditGameButton from './editButton/EditGameButton';

const SimpleGame = ({ tournamentId, game, teams, setTournament }) => {
  return (
    <div className="simple-game">
      <div className="game">
        <div className="team">
          <span className="team-name">{game.team1}</span>
          <div className="score-box">{game.score1}</div>
        </div>
        <div className="team">
          <div className="score-box">{game.score2}</div>
          <span className="team-name">{game.team2}</span>
        </div>
      </div>
      <EditGameButton
        tournamentId={tournamentId}
        game={game}
        teams={teams}
        setTournament={setTournament}
      />
    </div>
  );
};

export default SimpleGame;
