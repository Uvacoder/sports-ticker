import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getTeamLogo } from './helpers';

import './style.scss';

const Score = ({ teams }) => {
  return (
    <div className="score">
      <div className="team" style={{ backgroundColor: `#${teams[0].color}` }}>
        <img src={getTeamLogo(teams[0].name)} className="logo"></img>
        <label className="team-name">{teams[0].name}</label>
        <label className="team-record">{`(${teams[0].record})`}</label>
        <label className="team-score">{teams[0].score}</label>
      </div>
      <div className="team" style={{ backgroundColor: `#${teams[1].color}` }}>
        <img src={getTeamLogo(teams[1].name)} className="logo"></img>
        <label className="team-name">{teams[1].name}</label>
        <label className="team-record">{`(${teams[1].record})`}</label>
        <label className="team-score">{teams[1].score}</label>
      </div>
    </div>
  );
};

Score.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      record: PropTypes.string.isRequired,
    })
  ),
  status: PropTypes.shape({
    clock: PropTypes.string.isRequired,
    period: PropTypes.number.isRequired,
  }),
};

const Scores = () => {
  const [gameResults, setGameResults] = useState([]);

  useEffect(() => {
    const fetchRSS = async () => {
      const response = await fetch('/api/nfl');
      const json = await response.json();

      setGameResults(json);
    };

    fetchRSS();
  }, []);

  return (
    <div className="scores">
      <div className="scores-container">
        {gameResults.length &&
          gameResults.map(game => (
            <Score teams={game.teams} status={game.status} key={game.matchup} />
          ))}
      </div>
    </div>
  );
};

export default Scores;
