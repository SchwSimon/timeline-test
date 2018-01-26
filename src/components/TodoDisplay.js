import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/todo-actions';
import * as filterTypes from '../actions/todo-filterTypes';
import { getVisibleSortedTodos } from '../selectors/todo-selectors';
import TodoDisplayItem from './TodoDisplay-item';

import '../styles/TodoDisplay.css';

const mapStateToProps = state => ({
  todos: getVisibleSortedTodos(state),
  order: state.todo.order,
  visibilityFilter: state.todo.visibilityFilter
});

const mapActionsToProps = {
  setVisibilityFilter: actions.setVisibilityFilter,
  setTodoOrder: actions.setTodoOrder
};

  // the default order button classes
const orderButtonClassDefault = 'btn btn-secondary';
  // the order button's active class
const orderButtonClassActive = 'active';
  // the ASC order button className attribute
let orderButtonClassNameASC;
  // the DESC order button className attribute
let orderButtonClassNameDESC;

  // array of filter type keys
const filterTypeKeys = Object.keys(filterTypes);
  // <select/> options for the filter types
let filterTypesSelectOptions;

/*
 * DisplayTodos
 * displays the todo list
 */
export class TodoDisplay extends Component {
  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);
    this.setOrderASC = this.setOrderASC.bind(this);
    this.setOrderDESC = this.setOrderDESC.bind(this);
  }

  componentWillMount() {
    filterTypesSelectOptions = filterTypeKeys.map((filter, index) => (
      <option
        key={index}
        value={filter}
        defaultValue={this.props.visibilityFilter}
      >{filter}</option>
    ));

      // to set the button classes
    this.componentWillUpdate(this.props, this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.order !== this.props.order
      || nextProps.visibilityFilter !== this.props.visibilityFilter
        || nextProps.todos.length !== this.props.todos.length)
      return true;
    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    orderButtonClassNameASC = orderButtonClassDefault;
    orderButtonClassNameDESC = orderButtonClassDefault;
    if (nextProps.order === 'ASC')
      orderButtonClassNameASC += ' ' + orderButtonClassActive;
    else
      orderButtonClassNameDESC += ' ' + orderButtonClassActive;
  }

    // update the visibility filter
  onFilterChange(event) {
    this.props.setVisibilityFilter(event.target.value);
  }

  setOrderASC() {
    this.props.setTodoOrder('ASC');
  }

  setOrderDESC() {
    this.props.setTodoOrder('DESC');
  }

  render() {
    return (
      <div>
        <div className="DisplayTodos-header row">
          <div className="col-7">
            <h2>Todos</h2>
          </div>
          <div className="col-5">
            <div className="btn-group">
              <button
                type="button"
                className={orderButtonClassNameASC}
                onClick={this.setOrderASC}
              >
                ASC
              </button>
              <button
                type="button"
                className={orderButtonClassNameDESC}
                onClick={this.setOrderDESC}
              >
                DESC
              </button>
            </div>
            <select
              className="DisplayTodos-filters"
              onChange={this.onFilterChange}
            >
              {filterTypesSelectOptions}
            </select>
          </div>
        </div>

        <ul className="list-group">
          {this.props.todos.map(todo => (
            <TodoDisplayItem
              key={todo.id}
              {...todo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

TodoDisplay.PropTypes = {
  setVisibilityFilter: PropTypes.func.isRequired,
  setTodoOrder: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  todos: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(TodoDisplay);
