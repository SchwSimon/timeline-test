import positionToTime from './positionToTime';
import forceTwoDigitString from './forceTwoDigitString';

import { hourHeight, timelineOffset } from '../components/Timeline';

  // the content callback function for the selectable range component
export default (start, end) => {
  const startTime = positionToTime(start, hourHeight, timelineOffset);
  const endTime = positionToTime(end, hourHeight, timelineOffset);

  const durationMinutes = ((endTime.hours * 60) + endTime.minutes) - ((startTime.hours * 60) + startTime.minutes);
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return {
    upper: forceTwoDigitString(startTime.hours) + ':' + forceTwoDigitString(startTime.minutes),
    middle: ((hours > 0) ? hours + 'h ' : '') + ((minutes > 0) ? minutes + 'm' : ''),
    lower: forceTwoDigitString(endTime.hours) + ':' + forceTwoDigitString(endTime.minutes)
  }
}
