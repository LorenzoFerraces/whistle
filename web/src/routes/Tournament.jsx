import Menu from '../components/menu/Menu';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../api/AuthContext';
import AddResultButton from '../components/buttons/AddResultButton';
import TeamList from '../components/teamList/TeamList';
import ShowGamesButton from '../components/buttons/ShowGamesButton';
import CloseGameButton from '../components/buttons/CloseGameButton';
import DeleteGameButton from '../components/buttons/DeleteGameButton';

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
  }, [tournamentId, getTournament, isOpen]);

  if (!tournament) {
    return <p>Loading...</p>;
  }

  const statusToStrint = (state) => {
    if (state == 'true') {
      return 'Open';
    } else {
      return 'Close';
    }
  };

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
      `}</style>
      <Menu />
      <div className="element main">
        <div className="izq">
          <div className="header">
            <img src={tournament.imageURL} alt="Tournament" />
            <h3>Tournament: {tournament.name}</h3>
            <h3>Sport: {tournament.sport}</h3>
            <h3>Date: {tournament.date}</h3>
            <h3>Status: {statusToStrint(tournament.status)}</h3>
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
