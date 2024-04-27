import SimpleTournament from './simple/SimpleTournament';
import './TournamentList.css';

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
