import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LineIndicator from '../../components/LineIndicator';

Enzyme.configure({ adapter: new Adapter() });

describe('<LineIndicator />', () => {
  const addEventListenerSpy = sinon.spy();
  const removeEventListenerSpy = sinon.spy();
  const clientRectTopValue = 10;
  const props = {
    container: {
      addEventListener: addEventListenerSpy,
      removeEventListener: removeEventListenerSpy,
      getBoundingClientRect: () => ({top: clientRectTopValue})
    },
    minY: 30,
    updateThreshold: 10
  };
  const wrapper = shallow(<LineIndicator {...props} />);
  const defaultState = {...wrapper.state()};

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('default state', () => {
    expect(defaultState).toEqual({
      visible: false,
      posY: null
    });
  });

  describe('Lifecycle', () => {
    describe('componentDidMount', () => {
      it('must have added the event listeners to the props.container', () => {
        expect(addEventListenerSpy.calledWith('mouseenter', wrapper.instance().onMouseEnter, false)).toBeTruthy();
        expect(addEventListenerSpy.calledWith('mouseleave', wrapper.instance().onMouseLeave, false)).toBeTruthy();
        expect(addEventListenerSpy.calledWith('mousemove', wrapper.instance().onMouseMove, false)).toBeTruthy();
      });
    });

    describe('componentWillUnmount', () => {
      it('must remove the event listeners from the props.container', () => {
        wrapper.instance().componentWillUnmount();
        expect(removeEventListenerSpy.calledWith('mouseenter', wrapper.instance().onMouseEnter, false)).toBeTruthy();
        expect(removeEventListenerSpy.calledWith('mouseleave', wrapper.instance().onMouseLeave, false)).toBeTruthy();
        expect(removeEventListenerSpy.calledWith('mousemove', wrapper.instance().onMouseMove, false)).toBeTruthy();
      });
    });

    describe('shouldComponentUpdate', () => {
      it('must return true', () => {
        wrapper.state().visible = true;
        wrapper.state().posY = true;

        const state = {visible: false, posY: true};
        expect(wrapper.instance().shouldComponentUpdate(null, state)).toBe(true);

        state.visible = true;
        state.posY = false;
        expect(wrapper.instance().shouldComponentUpdate(null, state)).toBe(true);
      });

      it('must return false', () => {
        wrapper.state().visible = true;
        wrapper.state().posY = true;

        const state = {visible: true, posY: true};
        expect(wrapper.instance().shouldComponentUpdate(null, state)).toBe(false);
      });
    });

    describe('componentWillUpdate', () => {
      it('must call onUpdateContentCallback with position arg', () => {
        const onUpdateContentCallbackSpy = sinon.spy();
        wrapper.instance().componentWillUpdate({
          onUpdateContentCallback: onUpdateContentCallbackSpy
        }, {
          posY: 10
        });
        expect(onUpdateContentCallbackSpy.calledWith(10)).toBeTruthy();
      });
    });
  });

  describe('function onMouseEnter()', () => {
    it('must set the state prop: visible to true', () => {
      wrapper.instance().onMouseEnter();
      expect(wrapper.state().visible).toBe(true);
    });
  });

  describe('function onMouseLeave()', () => {
    it('must set the state prop: visible to false', () => {
      wrapper.instance().onMouseLeave();
      expect(wrapper.state().visible).toBe(false);
    });
  });

  describe('function onMouseMove()', () => {
    it('must correctly set the state prop: posY, if new position < props.minY', () => {
      wrapper.instance().onMouseMove({
        clientY: 20
      });
      expect(wrapper.state()).toMatchObject({
        posY: props.minY
      });
    });

    it('must return default if the new position < props.updateThreshold', () => {
      wrapper.state().posY = (props.minY + 15) - clientRectTopValue;
      const state = {...wrapper.state()};
      wrapper.instance().onMouseMove({
        clientY: props.minY + 15
      });
      expect(wrapper.state()).toEqual(state);
    });

    it('must set the correct new position', () => {
      wrapper.state().posY = 999;
      wrapper.instance().onMouseMove({
        clientY: props.minY + 100
      });
      expect(wrapper.state().posY).toBe((props.minY + 100) - clientRectTopValue);
    });
  });
});
