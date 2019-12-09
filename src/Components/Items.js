import React, { useEffect, useState, memo } from 'react';

import Item from './Item';

import { getNewItemIDs, getTopItemIDs, getBestItemIDs } from '../Services/api';
import { GET_MAX_ITEMS } from '../Services/api';
import { useScrollByIncrementing } from '../Services/scroll';

import itemsStyles from '../CSS/items.module.css';

const Items = () => {
  const [itemIDs, setItemIDs] = useState([]);
  const [newItems, setNewItems] = useState(false);
  const [topItems, setTopItems] = useState(false);
  const [bestItems, setBestItems] = useState(false);
  const [type, setType] = useState('New');

  let count = useScrollByIncrementing();

  useEffect(() => {
    if(newItems) {
      getNewItemIDs().then(data => setItemIDs(data));
      setType('New');
      document.getElementById('new').classList.add(itemsStyles.active);
      document.getElementById('top').classList.remove(itemsStyles.active);
      document.getElementById('popular').classList.remove(itemsStyles.active);
    }
    else if(topItems) {
      getTopItemIDs().then(data => setItemIDs(data));
      setType('Trending');
      document.getElementById('top').classList.add(itemsStyles.active);
      document.getElementById('new').classList.remove(itemsStyles.active);
      document.getElementById('popular').classList.remove(itemsStyles.active);
    }
    else if(bestItems) {
      getBestItemIDs().then(data => setItemIDs(data));
      setType('Popular');
      document.getElementById('popular').classList.add(itemsStyles.active);
      document.getElementById('new').classList.remove(itemsStyles.active);
      document.getElementById('top').classList.remove(itemsStyles.active);
    }
    else {
      getNewItemIDs().then(data => setItemIDs(data));
      document.getElementById('new').classList.add(itemsStyles.active);
      document.getElementById('top').classList.remove(itemsStyles.active);
      document.getElementById('popular').classList.remove(itemsStyles.active);
    }
  }, [newItems, topItems, bestItems]);

  return (
    <>
      <div className={itemsStyles['navWrapper']}>
        <p className={itemsStyles['instruction']}>Search for stories below...</p>
        <div className={itemsStyles['buttons']}>
          <button className={itemsStyles['inactive']} id='new' onClick={() => {setNewItems(true); setTopItems(false); setBestItems(false);}}>Latest</button>
          <button className={itemsStyles['inactive']} id='top' onClick={() => {setTopItems(true); setNewItems(false); setBestItems(false);}}>Trending</button>
          <button className={itemsStyles['inactive']} id='popular' onClick={() => {setBestItems(true); setNewItems(false); setTopItems(false);}}>Most Popular</button>
        </div>
      </div>
      {itemIDs.slice(0, count).map(itemID => <Item key = {itemID} id = {itemID} />)}
      <div className={itemsStyles['viewCount']}>You're viewing {count} of {GET_MAX_ITEMS()} {type} items</div>
    </>
  );
}

export default Items;