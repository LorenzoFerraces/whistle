import Modal from 'react-modal';
import '../createButton.css';
// import { modalCustomStyles } from '../../modal/ModalStyle';
import { useState } from 'react';
import ResultForm from '../../form/ResultForm';

const AddResultButton = ({ tournamentId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="create-button">
      <span onClick={openModal}>+</span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ResultForm tournamentId={tournamentId} close={closeModal} />
      </Modal>
    </div>
  );
};

export default AddResultButton;
