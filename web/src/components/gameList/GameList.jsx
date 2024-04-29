import SimpleGame from './simple/SimpleGame';

const GameList = ({ tournamentId, games, teams, setTournament }) => {
  return (
    <div className="game-list element">
      {games.length ? (
        games.map((game, index) => (
          <SimpleGame
            tournamentId={tournamentId}
            game={game}
            teams={teams}
            setTournament={setTournament}
            key={index}
          />
        ))
      ) : (
        <p>Nothing to show yet.</p>
      )}
    </div>
  );
};

export default GameList;
