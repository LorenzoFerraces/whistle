import { NavLink } from 'react-router-dom';
import './AddButton.css';

const AddTournamentButton = () => {
  return (
    <div className="add-button">
      <button>
        <NavLink to="/create">+</NavLink>
      </button>
    </div>
  );
};

export default AddTournamentButton;
