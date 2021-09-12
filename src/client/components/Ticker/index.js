import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import logo from '../../public/espn-logo.png';
import './style.scss';

const Ticker = () => {
  const [feed, updateFeed] = useState([{}]);
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const fetchSHA = async () => {
      const response = await fetch('/api/rss');
      const json = await response.json();

      updateFeed(json.data);
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
        <div className="ticker-category">TOP</div>
        <div className={classNames('ticker', feed[feedIndex].type)} onAnimationIteration={nextNews}>
          {feed[feedIndex].text}
        </div>
        <div className="ticker-logo-container">
          <img className="ticker-logo" src={logo} alt="ESPN_LOGO" />
        </div>
      </div>
    </>
  );
};

export default Ticker;
