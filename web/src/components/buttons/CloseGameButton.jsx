import { useContext, useState } from 'react';
import Modal from '../modal/Modal';
import { AuthContext } from '../../api/AuthContext';

const CloseGameButton = ({ tournamentId, setTournament, setIsOpen }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { closeTournament } = useContext(AuthContext);

  const handlerCloseGame = () => {
    closeTournament(tournamentId, setTournament, setIsOpen);
    setModalIsOpen(false);
  };

  return (
    <div className="add-button">
      <button onClick={() => setModalIsOpen(true)}>Close </button>
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        header={'Are you sure'}
      >
        <div className="buttons">
          <div className="add-button close-button">
            <button title="Yes" onClick={handlerCloseGame}>
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

export default CloseGameButton;

// <button title="Yes" onClick={handlerCloseGame} />
// <button title="No" onClick={() => setModalIsOpen(false)} />
