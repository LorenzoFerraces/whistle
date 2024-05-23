import AddResultButton from './buttons/AddResultButton';
import CloseTournamentButton from './buttons/CloseTournamentButton';
import DeleteTournamentButton from './buttons/DeleteTournamentButton';
import ShowGamesButton from './buttons/ShowGamesButton';
import './TournamentPanel.css';

const TournamentPanel = ({ tournamentId, tournament, setTournament }) => {
  return (
    <div className="tournament-panel">
      <div className="top-section">
        <ShowGamesButton
          tournamentId={tournamentId}
          games={tournament.games}
          teams={tournament.teams}
          setTournament={setTournament}
          tournamentStatus={tournament.status}
        />
        <AddResultButton
          tournamentId={tournamentId}
          teams={tournament.teams}
          setTournament={setTournament}
        />
      </div>
      <div className="bottom-section">
        {tournament.status ? (
          <CloseTournamentButton
            tournamentId={tournamentId}
            setTournament={setTournament}
            setIsOpen={tournament.status}
          />
        ) : (
          <DeleteTournamentButton tournamentId={tournamentId} />
        )}
      </div>
    </div>
  );
};

export default TournamentPanel;
