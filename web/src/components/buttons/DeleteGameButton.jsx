import { useContext, useState } from 'react';
import Modal from '../modal/Modal';
import { AuthContext } from '../../api/AuthContext';
import { useNavigate } from 'react-router-dom';

const DeleteGameButton = ({ tournamentId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { DeleteTournament } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlerDeleteGame = () => {
    setModalIsOpen(false);
    DeleteTournament(tournamentId, navigate);
  };

  return (
    <div className="add-button">
      <button className="delete" onClick={() => setModalIsOpen(true)}>
        Delete{' '}
      </button>
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        header={'Do you really want to delete the tournament ?'}
      >
        <div className="buttons">
          <div className="add-button close-button">
            <button title="Yes" onClick={handlerDeleteGame}>
              Yes
            </button>
          </div>

          <div className="add-button close-button">
            <button title="No" onClick={() => setModalIsOpen(false)}>
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteGameButton;
