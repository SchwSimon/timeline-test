import React, { PureComponent } from 'react';

import '../styles/Timeline-hours.css';

  // array of nodes which are displaying the time
  // from 00:00 to 23:00
const hoursDisplay = (() => {
  const hoursDisplay = [];
  for(let i = 0; i < 24; i++) {
    hoursDisplay[i] = (
      <div
        className="TimelineHours-hour"
        key={i}
      >
        <span>{i < 10 ? '0' + i : i}:00</span>
      </div>
    )
  }

  return hoursDisplay;
})();

class TimelineHoursDisplay extends PureComponent {
  render() {
    return (
      <div className="TimelineHours-hours">
        {hoursDisplay}
      </div>
    );
  }
}

export default TimelineHoursDisplay
