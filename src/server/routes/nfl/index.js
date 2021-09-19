import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/api/nfl', async (req, res) => {
  const response = await fetch(
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'
  );
  const data = await response.json();
  const mapped = data.events.map(event => {
    const status = {
      clock: event.status.displayClock,
      period: event.status.period,
      completed: event.status.type.completed,
    };
    const teams = event.competitions[0].competitors.map(competitor => {
      return {
        name: competitor.team.abbreviation,
        score: competitor.score,
        homeAway: competitor.homeAway,
        winner: competitor.winner,
      };
    });

    // Sort away team first, home second
    teams.sort((a, b) => {
      if (a.homeAway < b.homeAway) {
        return -1;
      }
      if (a.homeAway > b.homeAway) {
        return 1;
      }
      return 0;
    });

    return {
      teams,
      status,
    };
  });

  res.json(mapped);
});

module.exports = router;
