import { useState } from 'react';
import './AddButton.css';
import GameForm from '../form/game/GameForm';
import Modal from '../modal/Modal';

const AddResultButton = ({ tournamentId, teams, setTournament }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="add-button">
      <button onClick={() => setModalIsOpen(true)}>+</button>
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        header={'ADD RESULT'}
      >
        <GameForm
          tournamentId={tournamentId}
          teams={teams}
          setTournament={setTournament}
          close={() => setModalIsOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default AddResultButton;
