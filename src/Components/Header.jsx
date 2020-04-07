import React, { useState, useEffect } from 'react';

import { getNewItemIDs, getTopItemIDs, getBestItemIDs } from '../Services/api';
import { manageButtonClasses } from '../Services/classManager';

import Items from './Items';

import headerStyles from '../CSS/header.module.css';

const Header = () => {
  const [itemIDs, setItemIDs] = useState([]);
  const [newItems, setNewItems] = useState(false);
  const [topItems, setTopItems] = useState(false);
  const [bestItems, setBestItems] = useState(false);
  const [type, setType] = useState('New');

  useEffect(() => {
    if(newItems) {
      getNewItemIDs().then(data => {
          setItemIDs(data);
      });
      setType('New');
      manageButtonClasses('new');
    }
    else if(topItems) {
      getTopItemIDs().then(data => {
          setItemIDs(data);
      });
      setType('Trending');
      manageButtonClasses('top');
    }
    else if(bestItems) {
      getBestItemIDs().then(data => {
          setItemIDs(data);
      });
      setType('Popular');
      manageButtonClasses('popular');
    }
    else {
      getNewItemIDs().then(data => {
          setItemIDs(data);
      });
      manageButtonClasses('new');
    }
  }, [newItems, topItems, bestItems]);

  return (
    <>
      <div className={headerStyles['navWrapper']}>
        <p className={headerStyles['instruction']}>
          Search/scroll through stories below. Refresh the page to pull in the latest articles.
        </p>
        <div className={headerStyles['buttons']}>
          <button className={headerStyles['inactive']} id='new'
            onClick={() => {setNewItems(true); setTopItems(false); setBestItems(false);}}>Latest</button>
          <button className={headerStyles['inactive']} id='top'
            onClick={() => {setTopItems(true); setNewItems(false); setBestItems(false);}}>Trending</button>
          <button className={headerStyles['inactive']} id='popular'
            onClick={() => {setBestItems(true); setNewItems(false); setTopItems(false);}}>Most Popular</button>
        </div>
      </div>
      <Items itemIDs={itemIDs} type={type} />
    </>
  );
}

export default Header;