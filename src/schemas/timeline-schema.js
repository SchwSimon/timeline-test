import forceTwoDigitString from '../utils/forceTwoDigitString';


  // returns an object with every timestamp unit
  // input timestamp format:
  // YYYY-MM-DDTHH:MM:SS-HH:MM
const parseTimestamp = (timestamp) => {
  if (typeof timestamp !== 'string')
    return null;

  timestamp = timestamp.split(/[- T : +]/);

    // force number types
  return {
    formatted: forceTwoDigitString(timestamp[3]) + ':' + forceTwoDigitString(timestamp[4]),
    //year: timestamp[0]*1,
    //month: timestamp[1]*1,
    //day: timestamp[2]*1,
    hour: timestamp[3]*1,
    minute: timestamp[4]*1,
    //second: timestamp[5]*1,
    //offsetHours: timestamp[6]*1,
    //offsetMinutes: timestamp[7]*1
  }
};

  // default timeline data parser function
const defaultParser = (data, defaults = {}) => {
  const parsedData = [];

  for (let i = 0, len = data.length; i < len; i++) {
    const fromTime = parseTimestamp(data[i].from);
    const toTime = parseTimestamp(data[i].to);

    parsedData[i] = {
      id: data[i].id,
      title: data[i].title || defaults.title,
      notes: [data[i].note],
      color: data[i].color || defaults.color,
      icon: data[i].icon || defaults.icon,
      duration: data[i].duration,
      datetimeFrom: fromTime,
      datetimeTo: toTime,
      time: {
        from: fromTime,
        to: toTime
      },
      details: [{
        uid: data[i].uid,
        entry_type: data[i].entry_type,
        extra_attributes: data[i].extra_attributes,
        sub_entries: data[i].sub_entries,
      }]
    }
  }

  return parsedData;
};

  // timeline data parsing functions
const dataTypeParsers = {
  google_calendar: defaultParser,
  macOS: defaultParser,
  github: (data) => {
    const parsedData = [];

    for (let i = 0, len = data.length; i < len; i++) {
      const fromTime = parseTimestamp(data[i].from || data[i].at);
      let toTime = data[i].to ? parseTimestamp(data[i].to) : null;

      let id = 0;
      let duration = {};
      let details = [];
      let notes = [];
      let color, icon;
      data[i].events.forEach(event => {
        if (!toTime && event.to)
          toTime = parseTimestamp(event.to);

        id += event.id + '';

        for(let prop in event.duration) {
          if (prop !== 'formatted')
            duration[prop] += event.duration[prop];
        }

        details.push({
          uid: event.uid,
          entry_type: event.entry_type,
          extra_attributes: event.extra_attributes,
          sub_entries: event.sub_entries,
        });

        if (event.note)
          notes.push(event.note);

        if (!color && event.color)
          color = event.color;

        if (!icon && event.icon)
          icon = event.icon;
      });

      toTime = !toTime ? fromTime : toTime;
      duration.formatted = ((duration.hours < 10) ? '0' + duration.hours : duration.hours) +
        ':' + ((duration.minutes < 10) ? '0' + duration.minutes : duration.minutes);

      parsedData[i] = {
        id: id.toString(36).substr(2, 9)*1,
        title: 'Github',
        notes: notes,
        color: color || 'rgba(0,0,0,0.30)',
        icon: icon || 'github.png',
        duration: duration,
        datetimeFrom: fromTime,
        datetimeTo: toTime,
        time: {
          from: fromTime,
          to: toTime
        },
        details: details
      }
    }

    return parsedData;
  }
}

  // split the timeline data up into 3 chunks
const splitDataToLanes = (data, laneCount = 3) => {
    // sort the data by the from time, ascending
  data.sort((a, b) => a.time.from.formatted > b.time.from.formatted);

  const lanes = [];
  for(let i = 0; i < laneCount; i++) {
    lanes[i] = [];
  }

  data.forEach(entry => {
    for(let i = 0; i < laneCount; i++) {
      if (lanes[i].length > 0) {
        const toTime = {...lanes[i][lanes[i].length - 1].time.to};
        const fromTime = {...entry.time.from};

        let toTimeMinutes = toTime.minute;
        toTimeMinutes += toTime.hour * 60;
        let fromTimeMinutes = fromTime.minute;
        fromTimeMinutes += fromTime.hour * 60;

          // keep a space of atleast 30minutes between 2 entries on one lane
        if (fromTimeMinutes <= (toTimeMinutes + 30)) {
            // if its the last lane push the entry into the first lane
            // TODO: find a better solution to display all entries
          // if (i === laneCount-1) {
          //   lanes[0].push(entry);
          //   break;
          // }
          continue;
        }
      }

      lanes[i].push(entry);
      break
    }
  });

  return lanes;
}

  // temporary timeline data parser module
  // TODO: integrate normalizr.js to replace this module
export default (data) => {
  const parsedData = {};

  for(let dataType in data) {
    if (!dataTypeParsers[dataType]) {
      console.log('timeline-schema.js: No parsing function for', dataType);
      continue;
    }

    parsedData[dataType] = splitDataToLanes(dataTypeParsers[dataType](data[dataType], {
      icon: dataType + '.png'
    }));
  }

  return parsedData;
}
