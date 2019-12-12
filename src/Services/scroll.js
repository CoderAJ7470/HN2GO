import { useState, useEffect } from 'react';

import { GET_MAX_ITEMS } from '../Services/api';

const INCREMENT_VALUE = 20;

export const useScrollByIncrementing = () => {
  const [incrementing, setIncrementing] = useState(false);
  const [count, setCount] = useState(INCREMENT_VALUE);

  const resetCount = () => {
    setCount(20);
  }

  const scrollThePage = () => {
    if(window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight) {
        setIncrementing(true);
    }

    setIncrementing(false);
  };

  function debounce(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // First useEffect for checking if the user is scrolling the page and incrementing
  // needs to take place
  useEffect(() => {
    if(!incrementing) {
      return;
    }

    if(count + INCREMENT_VALUE >= GET_MAX_ITEMS) {
      setCount(GET_MAX_ITEMS);
    }
    else {
      if(count < 500) {
        setCount(count + INCREMENT_VALUE);
      }
    }
  }, [count, incrementing]);

  useEffect(() => {
    window.addEventListener('scroll', debounce(scrollThePage, 250));

    document.getElementById('new').addEventListener('click', resetCount);
    document.getElementById('top').addEventListener('click', resetCount);
    document.getElementById('popular').addEventListener('click', resetCount);

    return () => window.removeEventListener('scroll', scrollThePage);
  }, []);

  return count;
}