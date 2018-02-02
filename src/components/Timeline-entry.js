import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hourHeight, minuteHeight, timelineOffset } from './Timeline';

import '../styles/Timeline-entry.css';
import optionsSVG from '../images/options.svg';

  // the default/minimum height of an timeline entry (pixel)
const defaultEntryHeight = 18;
  // the top margin for the hidden info container (pixel)
const hiddenInfoMarginDefault = 45;
  // the threshold at which the hidden info container'a margin should adjust itself (pixel)
const hiddenInfoMarginThreshold = 55;
  // the minimum top margin for the hidden info container (pixel)
const hiddenInfoMarginMin = 30;

  // the entry's activity icon
let activityIcon;
  // the additional container's display style
let additionalDisplayStyle;
  // the modal's display style
let modalDisplayStyle;
  // the modal's time information
let modalInfoTime;

/*
 * Timeline entry
 */
export class TimelineEntry extends Component {
  constructor(props) {
    super(props);

    let entryHeight;
    let hiddenInfoMargin;
    let durationPrint = '';
    if (props.duration && (props.duration.hours || props.duration.minutes)) {
        // if a entry duration of atleast 1 minute is given,
        // calculate the entry's height as duration range
      entryHeight = (props.duration.hours * hourHeight) + (props.duration.minutes * minuteHeight);
      if (entryHeight < hiddenInfoMarginThreshold) {
          // if the height (pixel) is smaller than the margin threshold
          // calculate a smaller margin
        hiddenInfoMargin = hiddenInfoMarginDefault - (hiddenInfoMarginThreshold - entryHeight);
          // if the new margin is smaller than the minimum margin, set the minimum margin
        if (hiddenInfoMargin < hiddenInfoMarginMin)
          hiddenInfoMargin = hiddenInfoMarginMin;
      }

      if (props.duration.hours > 0)
        durationPrint = props.duration.hours + 'h ';
      if (props.duration.minutes > 0)
        durationPrint += props.duration.minutes + 'm';
    }

    this.state = {
      entryTop: (props.time.from.hour * hourHeight) + (props.time.from.minute * minuteHeight) + timelineOffset,  // the relative top position of the entry
      entryHeight: entryHeight || defaultEntryHeight,  // the entry's height
      hiddenInfoMargin: hiddenInfoMargin || null, // the hidden info container top margin
      durationPrint: durationPrint, // the duration information content
      modalVisible: false,  // whether or not to display the additional info modal
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onEntrySelect = this.onEntrySelect.bind(this);
  }

  componentWillMount() {
    this.componentWillUpdate(this.props, this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.modalVisible !== this.state.modalVisible)
      return true;
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    activityIcon = './images/' + nextProps.icon;
    modalInfoTime = nextProps.time.from.formatted + ' to ' + nextProps.time.to.formatted;
    if (nextState.modalVisible) {
      modalDisplayStyle = 'block';
      additionalDisplayStyle = 'inline-block';
    } else {
      modalDisplayStyle = 'none';
      additionalDisplayStyle = null;
    }
  }

    // toggles the modal
    // adds / removes a window event listener (click)
    // for closing the modal
  toggleModal(event) {
    if (event)
      event.stopPropagation();

    this.setState(prevState => {
      if (!prevState.modalVisible)
        window.addEventListener('click', this.onModalClose, false);
      else
        window.removeEventListener('click', this.onModalClose, false);

      return {
        modalVisible: !prevState.modalVisible
      }
    });
  }

    // on modal close event handler
  onModalClose(event) {
      // do not close the modal when clicked inside it
    if (!this.actionContainer.contains(event.target))
      this.toggleModal();
  }

    // trigger the onSelect prop function while passing
    // the entry's position data & title
  onEntrySelect(event) {
      // do not trigger select when clicked inside the modal
    if (!this.modal.contains(event.target))
      this.props.onSelect(
        this.state.entryTop,
        this.state.entryHeight,
        this.props.title
      );
  }

  render() {
    return (
      <div
        className="TimelineEntry"
        onClick={this.onEntrySelect}
        style={{
          top: this.state.entryTop,
          height: this.state.entryHeight
        }}
      >
        <div className="TimelineEntry-info">
          <div className="TimelineEntry-info-time">
            <time dateTime={this.props.datetimeFrom}>{this.props.time.from.formatted}</time>
            <span className="TimelineEntry-info-timeTo">
              <span> to </span>
              <time dateTime={this.props.datetimeTo}>{this.props.time.to.formatted}</time>
            </span>
          </div>
          <h6 className="TimelineEntry-info-title">
            {this.props.title}
          </h6>
        </div>

        <div className="TimelineEntry-container">
          <div
            className="TimelineEntry-container-bar"
            style={{backgroundColor: this.props.color}}
          >
            <img
              className="TimelineEntry-container-icon"
              src={activityIcon}
              alt={this.props.icon}
            />
          </div>
          <div
            className="TimelineEntry-container-additional"
            style={{
              display: additionalDisplayStyle,
              marginTop: this.state.hiddenInfoMargin
            }}
          >
            <div className="TimelineEntry-container-additionalContainer">
              <span className="TimelineEntry-container-duration">
                {this.state.durationPrint}
              </span>
              <div
                className="TimelineEntry-container-actionContainer"
                ref={el => this.actionContainer = el}
              >
                <button
                  className="TimelineEntry-container-actionTrigger"
                  onClick={this.toggleModal}
                >
                  <img className="TimelineEntry-container-actionIcon" src={optionsSVG} alt="more information"/>
                </button>
                <div
                  className="TimelineEntry-container-modal"
                  ref={el => this.modal = el}
                  style={{display: modalDisplayStyle}}
                >
                  <div className="TimelineEntry-container-modal-delete">
                    <span>&#x1f5d1;</span>
                  </div>
                  <div className="TimelineEntry-container-modal-info">
                    <dl>
                      <dt>Title</dt>
                      <dd>{this.props.title}</dd>
                      <dt>Time</dt>
                      <dd>{modalInfoTime}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="TimelineEntry-container-background" />
        </div>
      </div>
    );
  }
}

TimelineEntry.PropTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  datetimeFrom: PropTypes.string,
  start: PropTypes.object,
  time: PropTypes.object,
  color: PropTypes.string,
  icon: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default TimelineEntry;
