import Menu from '../components/menu/Menu';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../api/AuthContext';
import AddResultButton from '../components/buttons/AddResultButton';
import TeamList from '../components/teamList/TeamList';
import ShowGamesButton from '../components/buttons/ShowGamesButton';
import CloseGameButton from '../components/buttons/CloseGameButton';
import DeleteGameButton from '../components/buttons/DeleteGameButton';
import { SlCalender } from 'react-icons/sl';
import { FaCircle } from 'react-icons/fa6';

const Tournament = () => {
  const { tournamentId } = useParams();
  const [tournament, setTournament] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { getTournament } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      tournamentId &&
        (await getTournament(
          tournamentId,
          setTournament,
          setSuccess,
          setIsOpen,
        ));
    };
    fetchData();
    if (success) {
      document.title = tournament.name;
    }
  }, [tournamentId, getTournament, isOpen]);

  if (!tournament) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <style jsx>{`
        .element {
          display: flex;
        }

        .izq {
          width: 25%;
          background-color: #333;
          color: white;
          padding: 20px;
        }

        .der {
          width: 75%;
          padding: 20px;
        }

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 2px solid #444;
          padding: 10px;
          border-radius: 10px;
        }

        .header span {
          font-size: larger;
          color: grey;
          margin-left: 5px;
          margin-up: 5px;
        }

        .header img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }

        .buttons-up {
          display: flex;
          padding: 10px;
        }
        .buttons .delete {
          background-color: red;
        }

        .description {
          color: white;
          font-size: larger;
        }
      `}</style>
      <Menu />
      <div className="element main">
        <div className="izq">
          <div className="header">
            <img src={tournament.imageURL} alt="Tournament" />
            <h3> {tournament.name}</h3>
            <div className="description"> {tournament.description}</div>
            <span>{tournament.sport}</span>
            <div>
              <SlCalender color="grey" />
              <span>{tournament.date}</span>
            </div>
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
            <div className="options">
              <div className="buttons-up">
                <ShowGamesButton
                  tournamentId={tournamentId}
                  games={tournament.games}
                  teams={tournament.teams}
                  setTournament={setTournament}
                  tournamentStatus={isOpen}
                />
                {isOpen && (
                  <AddResultButton
                    tournamentId={tournamentId}
                    teams={tournament.teams}
                    setTournament={setTournament}
                  />
                )}
              </div>
              {isOpen ? (
                <CloseGameButton
                  tournamentId={tournamentId}
                  setTournament={setTournament}
                  setIsOpen={setIsOpen}
                />
              ) : (
                <DeleteGameButton tournamentId={tournamentId} />
              )}
            </div>
          </div>
        </div>
        <div className="der">
          {tournament && success && (
            <TeamList teams={tournament.teams} isOpen={isOpen} />
          )}
        </div>
      </div>
    </>
  );
};

export default Tournament;
