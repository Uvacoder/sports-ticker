import React, { useState, useEffect } from 'react';
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
      <div className="info-container">
        <div className="info" onAnimationIteration={nextNews}>
          {feed[feedIndex]}
        </div>
      </div>
    </>
  );
};

export default Ticker;
