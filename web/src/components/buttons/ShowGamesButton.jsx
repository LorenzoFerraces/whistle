import { useState } from 'react';
import GameList from '../gameList/GameList';
import Modal from '../modal/Modal';

const ShowGamesButton = ({ tournamentId, games, teams, setTournament }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="add-button">
      <button onClick={() => setModalIsOpen(true)}>History</button>
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        header={'GAMES'}
      >
        <GameList
          tournamentId={tournamentId}
          games={games}
          teams={teams}
          setTournament={setTournament}
        />
      </Modal>
    </div>
  );
};

export default ShowGamesButton;
