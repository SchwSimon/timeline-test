import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TodoDisplay } from '../../components/TodoDisplay';

Enzyme.configure({ adapter: new Adapter() });

describe('<TodoDisplay />', () => {
  const setTodoOrderSpy = sinon.spy();
  const setVisibilityFilterSpy = sinon.spy();
  const props = {
    setVisibilityFilter: setVisibilityFilterSpy,
    setTodoOrder: setTodoOrderSpy,
    order: '',
    visibilityFilter: '',
    todos: []
  };
  const wrapper = shallow(<TodoDisplay {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  describe('Lifecycle', () => {
    describe('componentWillMount', () => {
      it('must call componentWillUpdate() with the props and state args', () => {
        const componentWillUpdateStub = sinon.stub(wrapper.instance(), 'componentWillUpdate');
        wrapper.instance().componentWillMount();
        componentWillUpdateStub.restore();
        expect(componentWillUpdateStub.calledWith(props, wrapper.state())).toBeTruthy();
      });
    });

    describe('shouldComponentUpdate()', () => {
      let nextProps;
      beforeEach(() => {
        nextProps = {
          order: props.order,
          visibilityFilter: props.visibilityFilter,
          todos: props.todos
        };
      });

      it('must return true', () => {
        nextProps.order = !props.order;
        expect(wrapper.instance().shouldComponentUpdate(nextProps, null)).toBe(true);
      });

      it('must return true', () => {
        nextProps.visibilityFilter = !props.visibilityFilter;
        expect(wrapper.instance().shouldComponentUpdate(nextProps, null)).toBe(true);
      });

      it('must return true', () => {
        nextProps.todos = [1,1,1];
        expect(wrapper.instance().shouldComponentUpdate(nextProps, null)).toBe(true);
      });

      it('must return false', () => {
        expect(wrapper.instance().shouldComponentUpdate(nextProps, null)).toBe(false);
      });
    });
  });

  describe('function onFilterChange()', () => {
    it('must call setVisibilityFilter() with the given target value', () => {
      wrapper.find('.DisplayTodos-filters').simulate('change', {
        target: {value: 'filter_value'}
      });

      expect(setVisibilityFilterSpy.calledWith('filter_value')).toBeTruthy();
    });
  });

  describe('function setOrderASC() & setOrderDESC()', () => {
    it('must call props.setTodoOrder() with the order arg', () => {
      wrapper.instance().setOrderASC();
      expect(setTodoOrderSpy.calledWith('ASC')).toBeTruthy();
    });

    it('must call props.setTodoOrder() with the order arg', () => {
      wrapper.instance().setOrderDESC();
      expect(setTodoOrderSpy.calledWith('DESC')).toBeTruthy();
    });
  });
});
