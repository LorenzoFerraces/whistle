import SimpleGame from './simple/SimpleGame';

const GameList = ({ games }) => {
  return (
    <div className="game-list element">
      {games.map((game, index) => (
        <SimpleGame game={game} key={index} />
      ))}{' '}
    </div>
  );
};

export default GameList;
