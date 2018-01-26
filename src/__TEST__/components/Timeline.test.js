import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timeline from '../../components/Timeline';

Enzyme.configure({ adapter: new Adapter() });

describe('<Timeline />', () => {
  const wrapper = shallow(<Timeline />);
  const defaultState = {...wrapper.state()};

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('default state', () => {
    expect(defaultState).toEqual({
      rangeSelectorStart: null,
      rangeSelectorEnd: null
    });
  });

  describe('Lifecycle', () => {
    describe('componentDidMount()', () => {
      it('must call forceUpdate()', () => {
        const forceUpdateStub = sinon.stub(wrapper.instance(), 'forceUpdate');
        wrapper.instance().componentDidMount();
        forceUpdateStub.restore();
        expect(forceUpdateStub.called).toBeTruthy();
      });
    });

    describe('shouldComponentUpdate()', () => {
      let nextState;
      beforeEach(() => {
        nextState = {rangeSelectorStart: true, rangeSelectorEnd: true};
        wrapper.state().rangeSelectorStart = true;
        wrapper.state().rangeSelectorEnd = true;
      });

      it('must return true', () => {
        nextState.rangeSelectorStart = false;
        expect(wrapper.instance().shouldComponentUpdate(null, nextState)).toBe(true);
      });

      it('must return true', () => {
        nextState.rangeSelectorEnd = false;
        expect(wrapper.instance().shouldComponentUpdate(null, nextState)).toBe(true);
      });

      it('must return false', () => {
        expect(wrapper.instance().shouldComponentUpdate(null, nextState)).toBe(false);
      });
    });
  });

  describe('function onEntrySelect()', () => {
    it('must set the state range props', () => {
      wrapper.instance().onEntrySelect(1, 2, 'title');

      expect(wrapper.state()).toMatchObject({
        rangeSelectorStart: 1,
        rangeSelectorEnd: 1 + 2,
        rangeSelectorModalFormArgs: {
          title: 'title'
        }
      });
    });
  });
});
