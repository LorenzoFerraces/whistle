import TeamScore from '../teamScore/TeamScore';
import HeaderTeamScore from '../teamScore/HeaderTeamScore';
import './TeamsScores.css';

export const TeamsScores = ({ teams }) => {
  return (
    <div className="teamsScores-container">
      {teams && teams.length > 0 && (
        <div className="teams-table">
          <HeaderTeamScore />
          <div>
            {teams.map((team) => (
              <TeamScore key={team.name} team={team} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
