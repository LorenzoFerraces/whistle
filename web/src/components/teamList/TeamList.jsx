import React from 'react';
import './TeamList.css';
import TeamScore from './score/TeamScore';

const TeamList = ({ teams, isOpen }) => {
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
          teams.map((team, index) => (
            <TeamScore
              key={team.name}
              team={team}
              highlightFirstRow={!isOpen && index === 0}
            />
          ))}
      </tbody>
    </table>
  );
};

export default TeamList;
