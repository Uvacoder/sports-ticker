import React, { useState, useEffect } from 'react';

import logo from '../../public/espn-logo.png';
import './style.scss';

const Ticker = () => {
  const [feed, updateFeed] = useState([]);
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const fetchSHA = async () => {
      const response = await fetch('/api/rss');
      const json = await response.json();
      const feedData = json.data.slice(0, 5);

      updateFeed(feedData);
    };

    fetchSHA();
  }, []);

  const nextNews = () => {
    if (feed.length === feedIndex + 1) {
      setFeedIndex(0);
    } else {
      setFeedIndex(feedIndex + 1);
    }
  };

  return (
    <>
      <div className="ticker-container">
        <div className="ticker" onAnimationIteration={nextNews}>
          {feed[feedIndex]}
        </div>
        <div className="ticker-logo-container">
          <img className="ticker-logo" src={logo} alt="ESPN_LOGO" />
        </div>
      </div>
    </>
  );
};

export default Ticker;
