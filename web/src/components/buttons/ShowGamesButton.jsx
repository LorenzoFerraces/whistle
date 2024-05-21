import { useState } from 'react';
import GameList from '../gameList/GameList';
import Modal from '../modal/Modal';

const ShowGamesButton = ({
  tournamentId,
  games,
  teams,
  setTournament,
  tournamentStatus,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="add-button">
      <button onClick={() => setModalIsOpen(true)}>Results</button>
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
          tournamentStatus={tournamentStatus}
        />
      </Modal>
    </div>
  );
};

export default ShowGamesButton;
