import React from 'react';
import './HeaderTeamScore.css';

const HeaderTeamScore = () => {
  return (
    <>
      <div className="header-team-score-container">
        <div className="header-team-score">
          <div>Name</div>
          <div>Points</div>
          <div>Wins</div>
          <div>Losses</div>
          <div>Draws</div>
          <div>Goals Favor</div>
          <div>Goals Against </div>
          <div>Goal Difference</div>
        </div>
      </div>
    </>
  );
};

export default HeaderTeamScore;
