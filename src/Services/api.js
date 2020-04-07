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

// export const getUser = async userHandle => {
//   const result = await axios.get(`${baseURL}/${userHandle}`)
//     .then( ({ data }) => data);

//   console.log('result: ', result);
  
//   return result;
// }

export const getItem = async storyID => {
  const result = await axios.get(`${itemURL}/${storyID}.json`)
    .then( ({data}) =>  data);

  return result;
}

export const getNewItemIDs = async () => {
  const result = await axios.get(newItemsURL)
    .then( ({data}) => data);

  MAX_ITEMS = result.length;
  
  return result;
}

export const getTopItemIDs = async () => {
  const result = await axios.get(topItemsURL)
    .then( ({data}) => data);

  MAX_ITEMS = result.length;

  console.log('I got called');
  
  return result;
}

export const getBestItemIDs = async () => {
  const result = await axios.get(bestItemsURL)
    .then( ({data}) => data);

  MAX_ITEMS = result.length;
  
  return result;
}