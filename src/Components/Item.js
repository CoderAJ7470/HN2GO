import React, { useState, useEffect, memo } from 'react';

import { getItem } from '../Services/api';
import { convertUnixTime } from "../Services/timeConverter";

import itemStyles from '../CSS/item.module.css';

// Here, we are extracting the value of each ItemID by destructuring the "id";
// otherwise, we would need to pass in "props" instead of "id" and do
// props.id down below
const Item = memo(function Item({ id }) {
  const [item, setItem] = useState();

  useEffect(() => {
    let mounted = true;

    getItem(id)
      .then(data => data && data.url && mounted && setItem(data));

    return () => mounted = false;
  }, []);

  return (
    item && item.url ?
      <div className={itemStyles['item']}>
        <p>
          <i className={`fa fa-hand-o-right ${itemStyles['pointRight']}`} aria-hidden="true"></i>
          <a href={item.url} target='_blank' rel="noopener noreferrer">{item.title}</a>
        </p>
        <p>Submitted By: {item.by}</p>
        <p>Posted: {convertUnixTime(item.time)}</p>
      </div> : null
  )
});

export default Item;