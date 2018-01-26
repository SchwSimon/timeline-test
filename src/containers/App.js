/**
 * Interview Boilerplate
 * Use this template to explore React development during interviews
 *
 * Probable next steps could be:
 *
 * Step 1: Build logic (add/edit, complete/uncomplete, sort and filter)
 * Step 2: Refactor component into multiple components/stylesheets. Let's see how the candidate organizes things.
 * Step 3: Migrate to storing data in Redux
 * Step 4: re-select
 * Step 4: Add API interactions
 *
 */
import React, { PureComponent } from 'react';
import AddTodo from '../components/AddTodo';
import TodoDisplay from '../components/TodoDisplay';
import Timeline from '../components/Timeline';

import '../styles/App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <div className="App-container container">
          <div className="App-container-left">
            <AddTodo />
            <TodoDisplay />
          </div>
          <div className="App-container-right">
            <Timeline />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
