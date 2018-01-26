import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addTodo } from "../actions/todo-actions";

const mapActionsToProps = {
  addTodo: addTodo
};

/*
 * AddTodo
 * add todo text entrys to
 */
export class AddTodo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      todoTextValue: '' // the todo input value
    };

      // TEMP: add some todos
    this.props.addTodo('Some todo');
    this.props.addTodo('Another todo');
    this.props.addTodo('This is also a todo');
    this.props.addTodo('This is done, son');

    this.onTodoTextValueChange = this.onTodoTextValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    // update the todo text value
  onTodoTextValueChange(event) {
    this.setState({todoTextValue: event.target.value});
  }

    // add the current todo text value
  onSubmit(event) {
    event.preventDefault();

      // trimmed todoTextValue
    const todoTextValue = this.state.todoTextValue.trim();

      // do nothing if empty
    if (!todoTextValue)
      return;

      // add the new todo entry
    this.props.addTodo(todoTextValue);

      // empty the input field
    this.setState({todoTextValue: ''});
  }

  render() {
    return (
      <div>
        <h3>My todos</h3>
        <form
          className="form"
          onSubmit={this.onSubmit}
        >
          <div className="form-group row">
            <div className="col-9">
              <input
                type="text"
                className="form-control"
                placeholder="Add new todo"
                value={this.state.todoTextValue}
                onChange={this.onTodoTextValueChange}
              />
            </div>
            <div className="col-3">
              <button className="btn btn-block btn-success">Add</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, mapActionsToProps)(AddTodo);
