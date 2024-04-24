import Modal from 'react-modal';
import { useState } from 'react';
import ResultForm from '../form/ResultForm';
import './AddButton.css';

const AddResultButton = ({ tournamentId, teams, setTournament }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    content: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0',
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="add-button">
      <button onClick={openModal}>Add Result</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        shouldCloseOnOverlayClick={true}
      >
        <ResultForm
          tournamentId={tournamentId}
          teams={teams}
          setTournament={setTournament}
          close={closeModal}
        />
      </Modal>
    </div>
  );
};

export default AddResultButton;
