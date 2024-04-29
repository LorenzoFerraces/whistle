import './SimpleGame.css';
import { MdEdit } from 'react-icons/md';

const SimpleGame = ({ game }) => {
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
      <button>
        <MdEdit size={30} color={'#db4105'} />
      </button>
    </div>
  );
};

export default SimpleGame;
