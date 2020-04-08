const CUTOFF = 12;

export const convertUnixTime = unixTimeStamp => {
  let dateHelper = new Date(unixTimeStamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = dateHelper.getFullYear();
  let month = months[dateHelper.getMonth()];
  let date = dateHelper.getDate();
  let hour = dateHelper.getHours();
  let min = dateHelper.getMinutes();
  let timePeriod = '';

  if(hour == 12) {
    timePeriod = 'p.m.';
  }
  else if(hour > 12) {
    hour -= CUTOFF;
    timePeriod = 'p.m.';
  }
  else {
    timePeriod = 'a.m.'
  }

  if(min.toString().length === 1) {
    min = '0' + min;
  }

  return ` ${date} ${month}, ${year} at ${hour}:${min} ${timePeriod}`;
}