import './TeamList.css';
import TeamScore from './score/TeamScore';

const TeamList = ({ teams }) => {
  return (
    <table className="team-list">
      <thead>
        <th>NAME</th>
        <th>POINTS</th>
        <th>WINS</th>
        <th>LOSSES</th>
        <th>DRAWS</th>
        <th>FAVOR</th>
        <th>AGAINST</th>
        <th>DIFFERENCE</th>
      </thead>
      <tbody>
        {teams &&
          teams.length > 0 &&
          teams.map((team) => <TeamScore key={team.name} team={team} />)}
      </tbody>
    </table>
  );
};

export default TeamList;
