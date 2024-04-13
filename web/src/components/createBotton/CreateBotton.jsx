import { NavLink } from 'react-router-dom';
import './CreateBotton.css';

const CreateBotton = () => {

  return (
    <div className="create-button">
      <NavLink to="/create">
        <span>+</span>
      </NavLink> 
    </div>
  );
};

export default CreateBotton;
