import positionToTime from './positionToTime';
import forceTwoDigitString from './forceTwoDigitString';

import { hourHeight, timelineOffset } from '../components/Timeline';

  // the content callback function for the line indicator component
export default (position) => {
  const time = positionToTime(position, hourHeight, timelineOffset);

  if (time.hours < 0)
    time.hours = time.minutes = 0;

    // only display 5 minute steps
  time.minutes -= time.minutes % 5;

    // return the content as time indication
  return forceTwoDigitString(time.hours) + ':' + forceTwoDigitString(time.minutes)
}
