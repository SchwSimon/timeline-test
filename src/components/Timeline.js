import React, { Component } from 'react';
import TimelineHoursDisplay from './Timeline-hoursDisplay';
import TimelineEntries from './Timeline-entries';
import TimelineSelectDataType from './Timeline-selectDataType';
import SelectableRange from './SelectableRange';
import selectableRangeContentCallback from '../utils/selectableRangeContentCallback';
import LineIndicator from './LineIndicator';
import lineIndicatorContentCallback from '../utils/lineIndicatorContentCallback';

import questionMarkSVG from '../images/questionMark.svg';
import '../styles/Timeline.css';

  // the height of a hour block (pixel)
export const hourHeight = 150;
  // the height of a minute block (pixel)
export const minuteHeight = hourHeight / 60;
  // the line indicator update threshold
export const indicatorUpdateThreshold = Math.floor(minuteHeight * 5);
  // the top offset (pixel) of the timeline
export const timelineOffset = 30;

  // TEMP: the max-height style attribute for the content container
let maxContentHeight;

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeSelectorStart: null, // range selector preset starting position
      rangeSelectorEnd: null    // range selector preset ending position
    };

    this.onEntrySelect = this.onEntrySelect.bind(this);
  }

  componentWillMount() {
      // TEMP
    maxContentHeight = window.innerHeight - 107;
  }

  componentDidMount() {
      // we need to force here a rerender
      // to get this.wrapper to the line indicator & selectable range components
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.rangeSelectorStart !== this.state.rangeSelectorStart
      || nextState.rangeSelectorEnd !== this.state.rangeSelectorEnd)
      return true;
    return false;
  }

    // set the range selector range to the entry's duration
  onEntrySelect(start, duration, title) {
    this.setState({
      rangeSelectorStart: start,
      rangeSelectorEnd: start + duration,
      rangeSelectorModalFormArgs: {
        title: title
      }
    });
  }

  render() {
    return (
      <div className="Timeline-container">
        <div className="Timeline-header">
          <div className="Timeline-header-content">
            <div className="Timeline-header-content-left">
              <h2 className="Timeline-header-content-left-title">
                Timeline
              </h2>
            </div>
            <div className="Timeline-header-content-center">
              <TimelineSelectDataType />
            </div>
            <div className="Timeline-header-content-right">
              <button className="Timeline-header-content-right-button">
                <img className="Timeline-header-content-right-image" src={questionMarkSVG} alt="How it works" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="Timeline-content"
          style={{maxHeight: maxContentHeight}}
        >
          <div
            className="Timeline-content-container"
            ref={el => this.contentContainer = el}
          >
            {this.contentContainer &&
              <LineIndicator
                container={this.contentContainer}
                minY={timelineOffset}
                updateThreshold={indicatorUpdateThreshold}
                onUpdateContentCallback={lineIndicatorContentCallback}
              />
            }

            <TimelineHoursDisplay />

            <TimelineEntries
              onEntrySelect={this.onEntrySelect}
            />

            {this.contentContainer &&
              <SelectableRange
                container={this.contentContainer}
                yMin={30}
                rangeStart={this.state.rangeSelectorStart}
                rangeEnd={this.state.rangeSelectorEnd}
                modalFormArgs={this.state.rangeSelectorModalFormArgs}
                onUpdateContentCallback={selectableRangeContentCallback}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
