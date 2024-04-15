import './TeamScore.css';

const TeamScore = ({ team }) => {
  console.log(team);
  return (
    <>
      <div className="header-team-score-container">
        <div className="header-team-score">
          <div>{team.name}</div>
          <div>{team.wins * 2 + team.draws}</div>
          <div>{team.wins}</div>
          <div>{team.losses}</div>
          <div>{team.draws}</div>
          <div>{team.goalsFavour}</div>
          <div>{team.goalsAgainst} </div>
          <div>{team.goalsFavour - team.goalsAgainst}</div>
        </div>
      </div>
    </>
  );
};

export default TeamScore;

/* 
      <tr key={team.name}>
        <td>{team.name}</td>
        <td>{team.wins * 2 + team.draw}</td>
        <td>{team.wins}</td>
        <td>{team.losses}</td>
        <td>{team.draw}</td>
        <td>{team.goalsFavour}</td>
        <td>{team.goalsAgainst}</td>
        <td>{team.goalsFavour - team.goalsAgainst}</td>
      </tr>
*/
