import React from 'react';

import Item from './Item';

import { GET_MAX_ITEMS } from '../Services/api';
import { useScrollByIncrementing } from '../Services/scroll';

import itemsStyles from '../CSS/items.module.css';

const Items = ({itemIDs, type}) => {
  console.log('you called me?');
  // console.log('type of items: ', type);
  // console.log('itemIDs contains ', itemIDs);
  let count = useScrollByIncrementing();

  return (
    <>
      {itemIDs.length !== 0 ?
      <>
        {itemIDs.slice(0, count + 1).map(itemID => <Item key = {itemID} id = {itemID} />)}
        <div className={itemsStyles['viewCount']}>Showing {count} of {GET_MAX_ITEMS()} {type} items</div>
      </> :
      <>
        <div className={itemsStyles['viewCount']}>Loading {type} items...</div>
      </> }
    </>
  );
}

export default Items;