import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TimelineEntry from '../../components/Timeline-entry';

Enzyme.configure({ adapter: new Adapter() });

describe('<TimelineEntry />', () => {
  const onSelectSpy = sinon.spy();
  const props = {
    id: 1,
    title: 'title',
    datetimeFrom: '',
    duration: {
      hours: 1,
      minutes: 30,
    },
    time: {
      from: {hour: 1, minute: 5},
      to: {}
    },
    color: '',
    icon: '',
    hourHeight: 10,
    minuteHeight: 10,
    timelineOffset: 10,
    onSelect: onSelectSpy
  };
  const wrapper = shallow(<TimelineEntry {...props} />);
  const defaultState = {...wrapper.state()};

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('default state', () => {
    expect(defaultState).toEqual({
      entryTop: 192.5,
      entryHeight: 225,
      hiddenInfoMargin: null,
      durationPrint: '1h 30m',
      modalVisible: false
    });
  });

  describe('Lifecycle', () => {
    describe('componentWillMount()', () => {
      it('must call componentWillUpdate() with the props and state args', () => {
        const componentWillUpdateStub = sinon.stub(wrapper.instance(), 'componentWillUpdate');
        wrapper.instance().componentWillMount();
        componentWillUpdateStub.restore();
        expect(componentWillUpdateStub.calledWith(props, wrapper.state())).toBeTruthy();
      });
    });

    describe('shouldComponentUpdate()', () => {
      it('must return true', () => {
        wrapper.state().modalVisible = true;
        expect(wrapper.instance().shouldComponentUpdate(null, {modalVisible: false})).toBe(true);
      });

      it('must return false', () => {
        wrapper.state().modalVisible = true;
        expect(wrapper.instance().shouldComponentUpdate(null, {modalVisible: true})).toBe(false);
      });
    });
  });

  describe('toggleModal()', () => {
    const addEventListenerStub = sinon.stub(window, 'addEventListener');
    const removeEventListenerStub = sinon.stub(window, 'removeEventListener');
    afterAll(() => {
      addEventListenerStub.restore();
      removeEventListenerStub.restore();
    });

    describe('state: modalVisible = false', () => {
      wrapper.state().modalVisible = false;
      wrapper.find('.TimelineEntry-container-actionTrigger').simulate('click');
      const modalVisible = wrapper.state().modalVisible;

      it('must call addEventListener with click as event trigger and onModalClose() as callback', () => {
        expect(addEventListenerStub.calledWith('click', wrapper.instance().onModalClose, false)).toBeTruthy();
      });

      it('must set state prop: modalVisible, to true', () => {
        expect(modalVisible).toBe(true);
      });
    });

    describe('state: modalVisible = true', () => {
      wrapper.state().modalVisible = true;
      wrapper.find('.TimelineEntry-container-actionTrigger').simulate('click');
      const modalVisible = wrapper.state().modalVisible;

      it('must call removeEventListener with click as event trigger and onModalClose() as callback', () => {
        expect(removeEventListenerStub.calledWith('click', wrapper.instance().onModalClose, false)).toBeTruthy();
      });

      it('must set state prop: modalVisible, to false', () => {
        expect(modalVisible).toBe(false);
      });
    });
  });

  describe('onModalClose()', () => {
    const toggleModalStub = sinon.stub(wrapper.instance(), 'toggleModal');
    afterAll(() => {
      toggleModalStub.restore();
    });

    it('must not call toggleModal() if event target is inside modal', () => {
      wrapper.instance().actionContainer = {
        contains: () => true
      };
      wrapper.instance().onModalClose({target: null})
      expect(toggleModalStub.called).toBeFalsy();
    });

    it('must call toggleModal', () => {
      wrapper.instance().actionContainer = {
        contains: () => false
      };
      wrapper.instance().onModalClose({target: null})
      expect(toggleModalStub.called).toBeTruthy();
    });
  });

  describe('onEntrySelect()', () => {
    it('must not call onSelect() if event target is inside modal', () => {
      wrapper.instance().modal = {
        contains: () => true
      };
      wrapper.find('.TimelineEntry').simulate('click', {target: null});
      expect(onSelectSpy.called).toBeFalsy();
    });

    it('must call onSelect with the position data', () => {
      const args = [wrapper.state().entryTop, wrapper.state().entryHeight, props.title];
      wrapper.instance().modal = {
        contains: () => false
      };
      wrapper.find('.TimelineEntry').simulate('click', {target: null});
      expect(onSelectSpy.calledWith(...args)).toBeTruthy();
    });
  });
});
