import './TournamentList.css';
import SimpleTournament from './simple/SimpleTournament';

const TournamentList = ({ tournaments }) => {
  return (
    <div id="tournament-list">
      <div className="grid">
        {tournaments.map((tournament, index) => (
          <SimpleTournament tournament={tournament} key={index} />
        ))}{' '}
      </div>
    </div>
  );
};

export default TournamentList;
