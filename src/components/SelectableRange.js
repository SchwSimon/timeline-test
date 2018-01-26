import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/SelectableRange.css';

  // the threshold at which the range selector
  // shall apply its "on short" stylings
const wrapperShortStateThreshold = 30;
  // the wrapper's default class
const wrapperClassDefault = 'SelectableRange';
  // the wrapper's class addition in "short" state
const wrapperClassShort = 'SelectableRange-short';
  // the className attribute for the wrapper
let wrapperClassName = wrapperClassDefault;
  // the wrapper display style
let wrapperDisplayStyle = 'none';
  // the range display content object
let rangeDisplayContent = {};
  // the resizeable box height (pixel)
let resizeableBoxHeight;

/*
 * Dynamic range selector
 */
class SelectableRange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeVisible: false,
      rangeStart: 0,
      rangeEnd: 0,
      mouseDown: false,
      upperHandleDown: false,
      lowerHandleDown: false,
      modal_Y: null,
      modal_X: null,
      modalFormTitle: ''
    }

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onUpperHandleDown = this.onUpperHandleDown.bind(this);
    this.onLowerHandleDown = this.onLowerHandleDown.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.onModalFormTitleChange = this.onModalFormTitleChange.bind(this);
  }

  componentDidMount() {
    this.props.container.addEventListener('mousemove', this.onMouseMove, false);
    this.props.container.addEventListener('mousedown', this.onMouseDown, false);
    window.addEventListener('mouseup', this.onMouseUp, false);
  }

  componentWillUnmount() {
    this.props.container.removeEventListener('mousemove', this.onMouseMove, false);
    this.props.container.removeEventListener('mousedown', this.onMouseDown, false);
    window.removeEventListener('mouseup', this.onMouseUp, false);
  }

  componentWillReceiveProps(nextProps) {
      // set a preset range if these props change
    if (nextProps.rangeStart !== this.props.rangeStart
      || nextProps.rangeEnd !== this.props.rangeEnd)
      this.setRange(nextProps.rangeStart, nextProps.rangeEnd, nextProps.modalFormArgs);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.rangeStart !== this.state.rangeStart
        || nextState.rangeEnd !== this.state.rangeEnd
          || nextState.modalFormTitle !== this.state.modalFormTitle
            || nextState.rangeVisible !== this.state.rangeVisible)
      return true;
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
      // add the wrapper's short class, if the duration span
      // is lower than the threshold
    wrapperClassName = ((nextState.rangeEnd - nextState.rangeStart) < wrapperShortStateThreshold)
      ? wrapperClassDefault + ' ' + wrapperClassShort
      : wrapperClassDefault;
      // set the wrapper's display style
    wrapperDisplayStyle = nextState.rangeVisible ? 'block' : 'none';
      // set the resizeable box height
    resizeableBoxHeight = nextState.rangeEnd - nextState.rangeStart;

    if (nextProps.onUpdateContentCallback)
      rangeDisplayContent = nextProps.onUpdateContentCallback(nextState.rangeStart, nextState.rangeEnd);
  }

  onMouseDown(event, handle = null) {
    let posY;
    let modal_Y;
    let modal_X;

    if (!handle) {
        // return if the event target is inside the range selector
      if (this.wrapper.contains(event.target))
        return;

        // get the modal fixed position parameters
      modal_Y = event.clientY;
      modal_X = this.wrapper.getBoundingClientRect().left || null;

        // Cursor Y position relative to the props: container
      posY = event.clientY - this.props.container.getBoundingClientRect().top;

        // return if a minimum y position is set and the new position is lower than the minimum
      if (this.props.yMin && posY < this.props.yMin)
        return;
    }

    this.setState(prevState => ({
      rangeVisible: !!handle,
      rangeStart: posY || prevState.rangeStart,
      mouseDown: true,
      upperHandleDown: (handle && handle === 'UPPER') ? true : false,
      lowerHandleDown: (handle && handle === 'LOWER') ? true : false,
      modal_Y: modal_Y || prevState.modal_Y,
      modal_X: modal_X || prevState.modal_X,
      modalFormTitle: ''
    }));
  }

    // reset the mouse action props
  onMouseUp() {
    this.setState({
      mouseDown: false,
      upperHandleDown: false,
      lowerHandleDown: false
    });
  }

  onMouseMove(event) {
    const clientY = event.clientY;

    this.setState(prevState => {
        // return default if the mouse is not clicked
      if (!prevState.mouseDown)
        return prevState;

        // Cursor Y position relative to the props: container
      let newPosition = clientY - this.props.container.getBoundingClientRect().top;

        // if yMin is given, set the newPosition to yMin if its value is lower
      if (this.props.yMin !== undefined)
        newPosition = (newPosition < this.props.yMin) ? this.props.yMin : newPosition;

      return (prevState.upperHandleDown)
        ? {   // set range props for the upper handle
            rangeStart: newPosition,
            rangeEnd: newPosition > prevState.rangeEnd
              ? newPosition
              : prevState.rangeEnd
          }
        : {
            rangeVisible: true,
            rangeStart: prevState.rangeStart,
            rangeEnd: newPosition <= prevState.rangeStart
              ? prevState.rangeStart
              : newPosition
          }
    });
  }

  onUpperHandleDown(event) {
    this.onMouseDown(event, 'UPPER');
  }

  onLowerHandleDown(event) {
    this.onMouseDown(event, 'LOWER');
  }

    // set the preset range and modal form arguments
  setRange(start, end, modalFormArgs = {}) {
    this.setState(prevState => ({
      rangeVisible: true,
      rangeStart: start,
      rangeEnd: end < start
        ? start
        : end,
      modalFormTitle: modalFormArgs.title || prevState.modalFormTitle
    }));
  }

    // on modal form submit
  onModalSubmit(event) {
    event.preventDefault();

      // call the submit callback function
    if (this.props.onModalSubmit)
      this.props.onModalSubmit();

      // hide the selector
    this.setState({rangeVisible: false})
  }

    // set the modal form title input value
  onModalFormTitleChange(event) {
    this.setState({modalFormTitle: event.target.value})
  }

  render() {
    return (
      <div
        ref={el => this.wrapper = el}
        className={wrapperClassName}
        style={{
          display: wrapperDisplayStyle,
          top: this.state.rangeStart
        }}
      >
        <div className="SelectableRange-content">
          <div className="SelectableRange-content-upper">
            {rangeDisplayContent.upper}
          </div>
          <div className="SelectableRange-content-middle">
            <span>{rangeDisplayContent.middle}</span>
          </div>
          <div className="SelectableRange-content-lower">
            {rangeDisplayContent.lower}
          </div>
        </div>
        <div
          className="SelectableRange-resizeableBox"
          style={{height: resizeableBoxHeight}}
        >
          <div className="SelectableRange-modalAnchor">
            <div
              className="SelectableRange-modalFixed"
              style={{
                top: this.state.modal_Y,
                left: this.state.modal_X,
              }}
            >
              <div className="SelectableRange-modalContainer">
                <div className="SelectableRange-modal">
                  <form onSubmit={this.onModalSubmit}>
                    <input
                      className="SelectableRange-modal-title"
                      name="title"
                      type="text"
                      placeholder="What did you work on?"
                      value={this.state.modalFormTitle}
                      onChange={this.onModalFormTitleChange}
                    />
                    <div className="SelectableRange-modal-footer">
                      <div>
                        <button className="SelectableRange-modal-footer-btnSave">Save</button>
                        <button className="SelectableRange-modal-footer-btnCancel">Cancel</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="SelectableRange-resizeableBox-upperHandle"
            onMouseDown={this.onUpperHandleDown}
          ></div>
          <div
            className="SelectableRange-resizeableBox-lowerHandle"
            onMouseDown={this.onLowerHandleDown}
          ></div>
        </div>
      </div>
    );
  }
}

SelectableRange.PropTypes = {
  container: PropTypes.node.isRequired,
  yMin: PropTypes.number,
  rangeStart: PropTypes.number,
  rangeEnd: PropTypes.number,
  onUpdateContentCallback: PropTypes.function,
  onModalSubmit: PropTypes.function
};

export default SelectableRange;
