
  // converts a position integer to the relative hours & minutes
export default (position, hourLength = 60, offset = 0) => {
  const minuteLength = hourLength / 60;

  if (offset !== 0)
    position = position - offset;

  let hours = Math.floor(position / hourLength);
  let minutes = Math.ceil((position - (hours * hourLength)) / minuteLength);

  if (minutes === 60) {
      // set the next hour on full 60 minutes
    hours++;
    minutes = 0;
  }

  return {
    hours: hours,
    minutes: minutes
  }
}
