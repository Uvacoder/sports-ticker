import express from 'express';
import Parser from 'rss-parser';

const router = express.Router();
const parser = new Parser();

router.get('/api/rss', async (req, res) => {
  const results = [];
  const feed = await parser.parseURL('https://www.espn.com/espn/rss/news');

  feed.items.forEach(item => {
    results.push(item.title);
  });

  res.json({ data: results });
});

module.exports = router;
