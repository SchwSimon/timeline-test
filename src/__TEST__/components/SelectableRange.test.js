import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectableRange from '../../components/SelectableRange';

Enzyme.configure({ adapter: new Adapter() });

describe('<SelectableRange />', () => {
  const addEventListenerStub = sinon.stub(window, 'addEventListener');
  const removeEventListenerStub = sinon.stub(window, 'removeEventListener');
  const addEventListenerSpy = sinon.spy();
  const removeEventListenerSpy = sinon.spy();
  const onModalSubmitSpy = sinon.spy();
  const containerRectTopValue = 25;
  const container = {
    addEventListener: addEventListenerSpy,
    removeEventListener: removeEventListenerSpy,
    getBoundingClientRect: () => ({top: containerRectTopValue})
  };
  const props = {
    container: {...container},
    yMin: 0,
    onModalSubmit: onModalSubmitSpy
  };
  const wrapper = shallow(<SelectableRange {...props} />);
  const defaultState = {...wrapper.state()};

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('default state', () => {
    expect(defaultState).toEqual({
      rangeVisible: false,
      rangeStart: 0,
      rangeEnd: 0,
      mouseDown: false,
      upperHandleDown: false,
      lowerHandleDown: false,
      modal_Y: null,
      modal_X: null,
      modalFormTitle: ''
    });
  });

  describe('Lifecycle', () => {
    describe('componentDidMount', () => {
      it('must have added the event listeners', () => {
        expect(addEventListenerSpy.calledWith('mousemove', wrapper.instance().onMouseMove, false)).toBeTruthy();
        expect(addEventListenerSpy.calledWith('mousedown', wrapper.instance().onMouseDown, false)).toBeTruthy();
        expect(addEventListenerStub.calledWith('mouseup', wrapper.instance().onMouseUp, false)).toBeTruthy();
      });
    });

    describe('componentDidMount', () => {
      it('must remove the event listeners', () => {
        wrapper.instance().componentWillUnmount();

        expect(removeEventListenerSpy.calledWith('mousemove', wrapper.instance().onMouseMove, false)).toBeTruthy();
        expect(removeEventListenerSpy.calledWith('mousedown', wrapper.instance().onMouseDown, false)).toBeTruthy();
        expect(removeEventListenerStub.calledWith('mouseup', wrapper.instance().onMouseUp, false)).toBeTruthy();
      });
    });

    describe('componentWillReceiveProps', () => {
      it('must call setRange() with the new range parameters and form args', () => {
        const setRangeStub = sinon.stub(wrapper.instance(), 'setRange');
        const rangeStart = 'range start';
        const rangeEnd = 'range end';
        const modalFormArgs = 'form args';

        wrapper.instance().componentWillReceiveProps({
          rangeStart: rangeStart,
          rangeEnd: rangeEnd,
          modalFormArgs: modalFormArgs
        });

        setRangeStub.restore();

        expect(setRangeStub.calledWith(rangeStart, rangeEnd, modalFormArgs)).toBeTruthy();
      });
    });

    describe('shouldComponentUpdate', () => {
      let nextState;
      beforeEach(() => {
        nextState = {rangeStart: true, rangeEnd: true, modalFormTitle: true, rangeVisible: true};
        wrapper.state().rangeStart = true;
        wrapper.state().rangeEnd = true;
        wrapper.state().modalFormTitle = true;
        wrapper.state().rangeVisible = true;
      });

      it('must return true', () => {
        nextState.rangeStart = false;
        expect(wrapper.instance().shouldComponentUpdate(null, nextState)).toBe(true);
      });

      it('must return true', () => {
        nextState.rangeEnd = false;
        expect(wrapper.instance().shouldComponentUpdate(null, nextState)).toBe(true);
      });

      it('must return true', () => {
        nextState.modalFormTitle = false;
        expect(wrapper.instance().shouldComponentUpdate(null, nextState)).toBe(true);
      });

      it('must return true', () => {
        nextState.rangeVisible = false;
        expect(wrapper.instance().shouldComponentUpdate(null, nextState)).toBe(true);
      });

      it('must return false', () => {
        expect(wrapper.instance().shouldComponentUpdate(null, nextState)).toBe(false);
      });
    });

    describe('componentWillUpdate', () => {
      it('must call onUpdateContentCallback with range args', () => {
          // has to return an object otherwise it will set @rangeDisplayContent to undefined
          // this will produce an error on further rendering
        const onUpdateContentCallbackStub = sinon.stub().returns({});
        wrapper.instance().componentWillUpdate({
          onUpdateContentCallback: onUpdateContentCallbackStub,
        }, {
          rangeStart: 1,
          rangeEnd: 2
        });
        expect(onUpdateContentCallbackStub.calledWith(1, 2)).toBeTruthy();
      });
    });
  });

  describe('function onMouseDown()', () => {
    it('must set the correct state props', () => {
      const wrapperRectLeftValue = 50;
      wrapper.instance().wrapper = {
        contains: () => false,
        getBoundingClientRect: () => ({left: wrapperRectLeftValue})
      };

      wrapper.instance().onMouseDown({target: null, clientY: 100});

      expect(wrapper.state()).toMatchObject({
        rangeVisible: !!null,
        rangeStart: 100 - containerRectTopValue,
        mouseDown: true,
        upperHandleDown: false,
        lowerHandleDown: false,
        modal_Y: 100,
        modal_X: wrapperRectLeftValue,
        modalFormTitle: ''
      });
    });

    it('must set the correct state props if handle is given', () => {
      const state = {...wrapper.state()};

      wrapper.instance().onMouseDown({}, 'UPPER');

      expect(wrapper.state()).toMatchObject({
        rangeVisible: !!'UPPER',
        rangeStart: state.rangeStart,
        mouseDown: true,
        upperHandleDown: true,
        lowerHandleDown: false,
        modal_Y: state.modal_Y,
        modal_X: state.modal_X,
        modalFormTitle: ''
      });
    });
  });

  describe('function onMouseUp()', () => {
    it('must set the correct state props', () => {
      wrapper.state().mouseDown = true;
      wrapper.state().upperHandleDown = true;
      wrapper.state().lowerHandleDown = true;
      wrapper.instance().onMouseUp();
      expect(wrapper.state()).toMatchObject({
        mouseDown: false,
        upperHandleDown: false,
        lowerHandleDown: false
      });
    });
  });

  describe('function onMouseMove()', () => {
    describe('upperHandleDown = false', () => {
      const rangeStart = 0;
      const rangeEnd = 50;

      it('must set the correct state props', () => {
        wrapper.state().mouseDown = true;
        wrapper.state().upperHandleDown = false;
        wrapper.state().rangeVisible = false;
        wrapper.state().rangeStart = rangeStart;
        wrapper.state().rangeEnd = 0;

        const state = {...wrapper.state()};

        wrapper.instance().onMouseMove({
          clientY: containerRectTopValue + rangeEnd
        });

        expect(wrapper.state()).toMatchObject({
          rangeVisible: true,
          rangeStart: rangeStart, // prevState.rangeStart
          rangeEnd: rangeEnd
        });
      });
    });

    describe('upperHandleDown = true', () => {
      it('must set the correct state props', () => {
        wrapper.state().mouseDown = true;
        wrapper.state().upperHandleDown = true;
        wrapper.state().rangeStart = 0;
        wrapper.state().rangeEnd = 0;

        const state = {...wrapper.state()};

        wrapper.instance().onMouseMove({
          clientY: containerRectTopValue + 50
        });

        expect(wrapper.state()).toMatchObject({
          rangeStart: 50,
          rangeEnd: 50
        });
      });
    });
  });

  describe('function onUpperHandleDown() && onLowerHandleDown()', () => {
    const event = 'event';
    const onMouseDownStub = sinon.stub(wrapper.instance(), 'onMouseDown');

    wrapper.instance().onUpperHandleDown(event);
    wrapper.instance().onLowerHandleDown(event);

    onMouseDownStub.restore();

    it('must call onMouseDown with args', () => {
      expect(onMouseDownStub.calledWith(event, 'UPPER')).toBeTruthy();
      expect(onMouseDownStub.calledWith(event, 'LOWER')).toBeTruthy();
    });
  });

  describe('function setRange()', () => {
    it('must set te correct state range and modal props', () => {
      wrapper.instance().setRange(1, 2, {title: 'title'});

      expect(wrapper.state()).toMatchObject({
        rangeVisible: true,
        rangeStart: 1,
        rangeEnd: 2,
        modalFormTitle: 'title'
      });
    });
  });

  describe('function onModalSubmit()', () => {
    wrapper.state().rangeVisible = true;
    wrapper.instance().onModalSubmit({
      preventDefault: () => {}
    });
    const rangeVisible = wrapper.state().rangeVisible;

    it('must call props.onModalSubmit', () => {
      expect(onModalSubmitSpy.called).toBeTruthy();
    });

    it('must set the state prop: rangeVisible to false', () => {
      expect(rangeVisible).toBe(false);
    });
  });

  describe('function onModalFormTitleChange()', () => {
    it('must set the state prop: modalFormTitle', () => {
      wrapper.find('.SelectableRange-modal-title').simulate('change', {
        target: {value: 'new_title'}
      });

      expect(wrapper.state().modalFormTitle).toBe('new_title');
    });
  });
});
