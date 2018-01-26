import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddTodo } from '../../components/AddTodo';
import { addTodo } from '../../actions/todo-actions';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddTodo />', () => {
  const addTodoSpy = sinon.spy();
  const props = {
    addTodo: addTodoSpy
  };
  const wrapper = shallow(<AddTodo {...props} />);
  const defaultState = {...wrapper.state()};

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('must match the defualt state', () => {
    expect(defaultState).toEqual({
      todoTextValue: ''
    });
  });

  describe('function onTodoTextValueChange()', () => {
    it('must update the state prop: todoTextValue', () => {
      wrapper.find('.form-control').simulate('change', {
        target: {value: 'text'}
      });
      expect(wrapper.state().todoTextValue).toBe('text');
    });
  });

  describe('function onSubmit()', () => {
    const event = {
      preventDefault: () => {}
    };

    wrapper.state().todoTextValue = 'add todo';
    wrapper.find('form').simulate('submit', event);

    const todoTextValue = wrapper.state().todoTextValue;

    it('must dispatch addTodo() with the state prop: todoTextValue', () => {
      expect(addTodoSpy.calledWith('add todo')).toBeTruthy();
    });

    it('must empty the state prop: todoTextValue', () => {
      expect(todoTextValue).toBe('');
    });

    it('must not dispatch addTodo on empty state prop: todoTextValue', () => {
      wrapper.state().todoTextValue = '';
      wrapper.find('form').simulate('submit', event);
      expect(addTodoSpy.calledWith('')).toBeFalsy();
    });
  });
});
