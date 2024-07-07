import { useState } from 'react';
import BasicModal from '../../../modal/basic/BasicModal.jsx';
import TournamentEditForm from '../../../form/tournament/TournamentEditForm.jsx';
import '../../../tournament/info/edit/EditTournamentButton.css';
import { FaRegEdit } from 'react-icons/fa';
import ProfileEditForm from "../../../form/user/ProfileEditForm.jsx";

const EditProfileButton = ({ userId, userInfo, setUserInfo }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <button
        className="edit-profile-button"
        onClick={() => setModalIsOpen(true)}
      >
        <FaRegEdit size={20} />
      </button>
      <BasicModal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        header={'EDIT USER INFO'}
      >
        <ProfileEditForm
          userId={userId}
          oldUserInfo={userInfo}
          setUser={setUserInfo}
          close={() => setModalIsOpen(false)}
        />
      </BasicModal>
    </div>
  );
};

export default EditProfileButton;
