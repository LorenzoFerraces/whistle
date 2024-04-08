import { NavLink } from 'react-router-dom';
import './SimpleTournament.css';
import { SlCalender } from 'react-icons/sl';

const SimpleTournament = ({ tournament }) => {
  return (
    <div className="simple-tournament">
      <div className="image">
        {tournament.image ? (
          <img src={tournament.image}></img>
        ) : (
          <img src="../../../../assets/t.jpg" alt="Tournament" />
        )}
      </div>
      <div className="content">
        {tournament.name && tournament.description && tournament.date ? (
          <div className="info">
            <NavLink to={`/tournament/${tournament.id}`}>
              <span className="name">{tournament.name}</span>
            </NavLink>
            <div>{tournament.description}</div>
            <div className="date">
              <SlCalender />
              <span>{tournament.date}</span>
            </div>
          </div>
        ) : (
          <p>Sorry, no info available.</p>
        )}
      </div>
    </div>
  );
};

export default SimpleTournament;
