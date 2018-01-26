import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTodoDone } from '../actions/todo-actions';
import PropTypes from 'prop-types';

import '../styles/TodoDisplay-item.css';

const mapActionsToProps = {
  toggleTodoDone: toggleTodoDone
};

  // the wrapper's background color
let wrapperBackgroundColor;
  // the wrapper's done container content
let wrapperDoneContent;

  // Todo list item node
export class TodoDisplayItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.done
    };

    this.toggleDone = this.toggleDone.bind(this);
  }

  componentWillMount() {
    this.componentWillUpdate(this.props, this.state);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.done !== this.props.done)
      this.setState({done: nextProps.done});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.done !== this.state.done)
      return true;
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.done) {
      wrapperBackgroundColor = '#d1ffd1';
      wrapperDoneContent = '✅';
    } else {
      wrapperBackgroundColor = null;
      wrapperDoneContent = '⭕';
    }
  }

  toggleDone() {
      // toggle the item's done status
    this.props.toggleTodoDone(this.props.id);
    this.setState(prevState => ({done: !prevState.done}));
  }

  render() {
    return (
      <li
        className="TodoDisplayItem list-group-item"
        onClick={this.toggleDone}
        style={{backgroundColor: wrapperBackgroundColor}}
      >
        <span className="TodoDisplayItem-done">{wrapperDoneContent}</span>
        {this.props.title}
      </li>
    );
  }
}


TodoDisplayItem.propTypes = {
  done: PropTypes.bool,
  title: PropTypes.string
};

export default connect(null, mapActionsToProps)(TodoDisplayItem);
