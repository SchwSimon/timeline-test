import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TodoDisplayItem } from '../../components/TodoDisplay-item';

Enzyme.configure({ adapter: new Adapter() });

describe('<TodoDisplayItem />', () => {
  const toggleTodoDoneSpy = sinon.spy();
  const props = {
    id: 3,
    toggleTodoDone: toggleTodoDoneSpy
  };
  const wrapper = shallow(<TodoDisplayItem {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  describe('Lifecycle', () => {
    describe('componentWillMount()', () => {
      it('must call componentWillUpdate() with state and prop args', () => {
        const componentWillUpdateStub = sinon.stub(wrapper.instance(), 'componentWillUpdate');
        wrapper.instance().componentWillMount();
        componentWillUpdateStub.restore();
        expect(componentWillUpdateStub.calledWith(props, wrapper.state())).toBeTruthy();
      });
    });

    describe('componentWillReceiveProps()', () => {
      it('must set the state prop: done', () => {
        wrapper.instance().componentWillReceiveProps({done: 'ok'});
        expect(wrapper.state().done).toBe('ok');
      });
    });

    describe('shouldComponentUpdate()', () => {
      it('must return true', () => {
        wrapper.state().done = false;
        expect(wrapper.instance().shouldComponentUpdate(null, {done: true})).toBe(true);
      });

      it('must return false', () => {
        wrapper.state().done = true;
        expect(wrapper.instance().shouldComponentUpdate(null, {done: true})).toBe(false);
      });
    });
  });

  describe('function toggleDone()', () => {
    const done = wrapper.state().done;
    wrapper.find('.TodoDisplayItem').simulate('click');

    it('must call props.toggleTodoDone() with the props.id', () => {
      expect(toggleTodoDoneSpy.calledWith(props.id)).toBeTruthy();
    });

    it('must toggle the state prop: done', () => {
      expect(wrapper.state().done).toBe(!done);
    });
  });
});
