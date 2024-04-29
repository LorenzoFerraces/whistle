import { useState } from 'react';
import Modal from '../../../modal/Modal';
import { MdEdit } from 'react-icons/md';
import './EditGameButton.css';
import EditGameForm from './form/EditGameForm';

const EditGameButton = ({ tournamentId, game, teams, setTournament }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button className="edit-game-button" onClick={() => setModalIsOpen(true)}>
        <MdEdit size={30} color={'#db4105'} />
      </button>
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        header={'EDIT GAME'}
      >
        <EditGameForm
          tournamentId={tournamentId}
          game={game}
          teams={teams}
          close={() => setModalIsOpen(false)}
          setTournament={setTournament}
        />
      </Modal>
    </div>
  );
};

export default EditGameButton;
