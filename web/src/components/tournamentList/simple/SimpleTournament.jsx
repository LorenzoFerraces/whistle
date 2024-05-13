import { NavLink } from 'react-router-dom';
import './SimpleTournament.css';
import { SlCalender } from 'react-icons/sl';
import { FaCircle } from 'react-icons/fa6';

const SimpleTournament = ({ tournament }) => {
  return (
    <div className="simple-tournament">
      <div className="image">
        {tournament.imageURL ? (
          <img src={tournament.imageURL}></img>
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGME2VivHFEZWJDwVWGUfxtjSGg78t58nNkx4Y3eBQUw&s"
            alt="Tournament"
          />
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
              <span>{tournament.sport}</span>
              <div>
                {tournament.status === 'true' ? (
                  <div className="status">
                    <FaCircle color="green" />
                    <span>OPEN</span>
                  </div>
                ) : (
                  <div className="status">
                    <FaCircle color="red" />
                    <span>CLOSED</span>
                  </div>
                )}
              </div>
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
