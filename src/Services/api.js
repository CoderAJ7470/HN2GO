import axios from 'axios';

const baseURL = 'https://hacker-news.firebaseio.com/v0';
const newItemsURL = `${baseURL}/newstories.json`;
const topItemsURL = `${baseURL}/topstories.json`;
const bestItemsURL = `${baseURL}/beststories.json`;
const itemURL = `${baseURL}/item`;
let MAX_ITEMS = '';

export function GET_MAX_ITEMS() {
  if(MAX_ITEMS) {
    return MAX_ITEMS;
  }
}

export const getItem = async storyID => {
  const result = await axios.get(`${itemURL}/${storyID}.json`)
    .then( ({data}) =>  data);

  return result;
}

// "data" inside the parentheses and brace brackets tells axios to filter out only data, not other unwanted junk
export const getNewItemIDs = async () => {
  const result = await axios.get(newItemsURL)
    .then( ({data}) => data);

  MAX_ITEMS = result.length;
  console.log('new items: ',MAX_ITEMS);
  
  return result;
}

export const getTopItemIDs = async () => {
  const result = await axios.get(topItemsURL)
    .then( ({data}) => data);

  MAX_ITEMS = result.length;
  console.log('top items: ', MAX_ITEMS);
  
  return result;
}

export const getBestItemIDs = async () => {
  const result = await axios.get(bestItemsURL)
    .then( ({data}) => data);

  MAX_ITEMS = result.length;
  console.log('best items:', MAX_ITEMS);
  
  return result;
}