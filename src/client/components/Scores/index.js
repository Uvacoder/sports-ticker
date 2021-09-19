import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GB from '../../public/assets/logos/gb.png';
import './style.scss';

const Score = ({ teams, status }) => {
  return (
    <div className="score-container">
      <div>{`${status.clock} - ${status.period}`}</div>
      <div className="score-team-container">
        <div className="team">
          <label>{teams[0].name}</label>
          <label>{teams[0].score}</label>
        </div>
        <div className="team">
          <label>{teams[1].name}</label>
          <label>{teams[1].score}</label>
        </div>
      </div>
    </div>
  );
};

Score.propTypes = {
  teams: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
  }),
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
      {gameResults.length &&
        gameResults.map(game => <Score teams={game.teams} status={game.status} key={game.teams} />)}
    </div>
  );
};

export default Scores;
