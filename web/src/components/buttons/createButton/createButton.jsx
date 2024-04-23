import { NavLink } from 'react-router-dom';
import '../createButton.css';

const CreateButton = () => {
  return (
    <div className="create-button">
      <NavLink to="/create">
        <span>+</span>
      </NavLink>
    </div>
  );
};

export default CreateButton;
