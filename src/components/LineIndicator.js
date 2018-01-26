import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/LineIndicator.css';

  // the wrapper's display style
let displayStyle = 'none';
  // the indicator's content display content
let indicatorDisplayContent;

/*
 * displays a absolut positioned thin bar, holding a container
 * which contains the provided content
 */
class LineIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      posY: null
    }

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

    // add the mouve move event listener
  componentDidMount() {
    this.props.container.addEventListener('mouseenter', this.onMouseEnter, false);
    this.props.container.addEventListener('mouseleave', this.onMouseLeave, false);
    this.props.container.addEventListener('mousemove', this.onMouseMove, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.visible !== this.state.visible
      || nextState.posY !== this.state.posY)
      return true;
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.onUpdateContentCallback)
      indicatorDisplayContent = nextProps.onUpdateContentCallback(nextState.posY);

    displayStyle = nextState.visible ? 'block' : 'none';
  }

    // remove the mouve move event listener
  componentWillUnmount() {
    this.props.container.removeEventListener('mouseenter', this.onMouseEnter, false);
    this.props.container.removeEventListener('mouseleave', this.onMouseLeave, false);
    this.props.container.removeEventListener('mousemove', this.onMouseMove, false);
  }

  onMouseEnter() {
    this.setState({visible: true});
  }

  onMouseLeave() {
    this.setState({visible: false});
  }

  onMouseMove(event) {
    const clientY = event.clientY;

    this.setState(prevState => {
      let newY = clientY - this.props.container.getBoundingClientRect().top;

        // set the new position to the minimum Y-position if its lower
      if (newY < (this.props.minY || 0)) {
        newY = this.props.minY;

          // return default if the position already is at the min Y-position
        if (newY === prevState.posY)
          return prevState;
      } else if (Math.abs(newY - prevState.posY) < (this.props.updateThreshold || 0)) {
          // return default if the new position does not reach the update span
        return prevState;
      }

      return {posY: newY}
    });
  }

  render() {
    return (
      <div
        className="LineIndicator"
        style={{
          top: this.state.posY,
          display: displayStyle
        }}
      >
        <div className="LineIndicator-content">
          {indicatorDisplayContent}
        </div>
      </div>
    );
  }
}

LineIndicator.PropTypes = {
  container: PropTypes.node.isRequired,
  minY: PropTypes.number,
  updateThreshold: PropTypes.number,
  onUpdateContentCallback: PropTypes.func
};

export default LineIndicator;
