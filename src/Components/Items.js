import React, { useEffect, useState, memo } from 'react';

import Item from './Item';

import { getNewItemIDs, getTopItemIDs, getBestItemIDs } from '../Services/api';
import { GET_MAX_ITEMS } from '../Services/api';
import { useScrollByIncrementing } from '../Services/scroll';

import itemsStyles from '../CSS/items.module.css';

const Items = () => {
  const [itemIDs, setItemIDs] = useState([]);
  const [newItems, setNewStories] = useState(false);
  const [topItems, setTopStories] = useState(false);
  const [bestItems, setbestItems] = useState(false);
  const [type, setType] = useState('New');

  let count = useScrollByIncrementing();

  useEffect(() => {
    if(newItems) {
      getNewItemIDs().then(data => setItemIDs(data));
      setType('New');
    }
    else if(topItems) {
      getTopItemIDs().then(data => setItemIDs(data));
      setType('Trending');
    }
    else if(bestItems) {
      getBestItemIDs().then(data => setItemIDs(data));
      setType('Popular');
    }
    else {
      console.log('called default');
      getNewItemIDs().then(data => setItemIDs(data));
    }
  }, [newItems, topItems, bestItems]);

  return (
    <>
      <div className={itemsStyles['navWrapper']}>
        <h2 className={itemsStyles['appName']}>HN2GO - Latest, Trending and Most Popular Stories</h2>
        <div className={itemsStyles['buttons']}>
          <a href='' id='new' onClick={() => {setNewStories(true); setTopStories(false); setbestItems(false);}}>Latest</a>
          <a href='' id='top' onClick={() => {setTopStories(true); setNewStories(false); setbestItems(false);}}>Trending</a>
          <a href='' id='popular' onClick={() => {setbestItems(true); setNewStories(false); setTopStories(false);}}>Most Popular</a>
        </div>
      </div>
      {itemIDs.slice(0, count).map(itemID => <Item key = {itemID} id = {itemID} />)}
      <div className={itemsStyles['viewCount']}>You're viewing {count} of {GET_MAX_ITEMS()} {type} items</div>
    </>
  );
}

export default Items;