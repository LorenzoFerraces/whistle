import { useState } from 'react';
import GameForm from '../../../form/game/GameForm';
import Modal from '../../../modal/basic/BasicModal';
import './TournamentPanelButton.css';

const AddResultButton = ({ tournamentId, teams, setTournament }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="panel-button">
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
