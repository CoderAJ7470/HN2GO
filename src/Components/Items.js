import React, { useEffect, useState } from 'react';

import Item from './Item';

import { getNewItemIDs, getTopItemIDs, getBestItemIDs } from '../Services/api';
import { GET_MAX_ITEMS } from '../Services/api';
import { useScrollByIncrementing } from '../Services/scroll';
import { manageButtonClasses } from '../Services/classManager';

import itemsStyles from '../CSS/items.module.css';

const Items = () => {
  const [itemIDs, setItemIDs] = useState([]);
  const [newItems, setNewItems] = useState(false);
  const [topItems, setTopItems] = useState(false);
  const [bestItems, setBestItems] = useState(false);
  const [type, setType] = useState('New');

  let count = useScrollByIncrementing();

  useEffect(() => {
    // let isSubscribed = true;

    window.addEventListener('scroll', showOrHideBTTButton);

    if(newItems) {
      getNewItemIDs().then(data => {
        // if(isSubscribed) {
          setItemIDs(data);
        // }
      });
      setType('New');
      manageButtonClasses('new');
    }
    else if(topItems) {
      getTopItemIDs().then(data => {
        // if(isSubscribed) {
          setItemIDs(data);
        // }
      });
      setType('Trending');
      manageButtonClasses('top');
    }
    else if(bestItems) {
      getBestItemIDs().then(data => {
        // if(isSubscribed) {
          setItemIDs(data);
        // }
      });
      setType('Popular');
      manageButtonClasses('popular');
    }
    else {
      getNewItemIDs().then(data => {
        // if(isSubscribed) {
          setItemIDs(data);
        // }
      });
      manageButtonClasses('new');
    }

    // return () => isSubscribed = false;
  }, [newItems, topItems, bestItems]);

  const showOrHideBTTButton = () => {
    const buttonDivHeight = document.getElementById('buttonDiv').offsetHeight;
    const scrollHeight = document.documentElement.scrollTop;

    if(scrollHeight >= buttonDivHeight) {
      document.getElementById('bttButton').classList.remove(itemsStyles.hideBttButton);
      document.getElementById('bttButton').classList.add(itemsStyles.showBttButton);
    }

    if(scrollHeight <= buttonDivHeight) {
      document.getElementById('bttButton').classList.remove(itemsStyles.showBttButton);
      document.getElementById('bttButton').classList.add(itemsStyles.hideBttButton);
    }
  }

  return (
    <>
      <div id='buttonDiv' className={itemsStyles['navWrapper']}>
        <p className={itemsStyles['instruction']}>
          Search/scroll through stories below. Refresh the page to pull in the latest articles.
        </p>
        <div className={itemsStyles['buttons']}>
          <button className={itemsStyles['inactive']} id='new'
            onClick={() => {setNewItems(true); setTopItems(false); setBestItems(false);}}>Latest</button>
          <button className={itemsStyles['inactive']} id='top'
            onClick={() => {setTopItems(true); setNewItems(false); setBestItems(false);}}>Trending</button>
          <button className={itemsStyles['inactive']} id='popular'
            onClick={() => {setBestItems(true); setNewItems(false); setTopItems(false);}}>Most Popular</button>
        </div>
      </div>
      {itemIDs.slice(0, count).map(itemID => <Item key = {itemID} id = {itemID} />)}
      <div className={itemsStyles['viewCount']}>
        Showing {count} of {GET_MAX_ITEMS()} {type} items
        <span id='bttButton' className={`${itemsStyles['hideBttButton']} ${itemsStyles['']}`}>
          Back to top
        </span>
      </div>
    </>
  );
}

export default Items;