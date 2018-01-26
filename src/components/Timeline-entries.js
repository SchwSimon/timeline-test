import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTimeline } from '../actions/timeline-actions';
import { getTimelineData } from '../selectors/timeline-selectors';
import TimelineEntry from '../components/Timeline-entry';

import '../styles/Timeline-entries.css';

const mapStateToProps = state => ({
  timelineData: getTimelineData(state)
});

const mapActionsToProps = {
  fetchTimeline: fetchTimeline
};

export class TimelineEntries extends PureComponent {
  componentDidMount() {
      // TEMP: fetch the timeline data
    this.props.fetchTimeline();
  }

  render() {
    return (
      <div className="TimelineEntries">
        {this.props.timelineData && this.props.timelineData.map((lane, index) => (
          <div
            className="TimelineEntries-lane"
            key={index}
          >
            {lane.map((entry, index) => (
              <TimelineEntry
                key={entry.id}
                onSelect={this.props.onEntrySelect}
                {...entry}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

TimelineEntries.PropTypes = {
  timelineData: PropTypes.array,
  onEntrySelect: PropTypes.func
};

export default connect(mapStateToProps, mapActionsToProps)(TimelineEntries);
