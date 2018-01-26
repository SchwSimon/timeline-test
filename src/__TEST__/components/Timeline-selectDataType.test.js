import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TimelineSelectDataType } from '../../components/Timeline-selectDataType';

Enzyme.configure({ adapter: new Adapter() });

describe('<TimelineSelectDataType />', () => {
  const changeDataTypeSpy = sinon.spy();
  const props = {
    dataTypes: [],
    changeDataType: changeDataTypeSpy
  };
  const wrapper = shallow(<TimelineSelectDataType {...props} />);
  const defaultState = {...wrapper.state()};

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  describe('Lifecycle', () => {
    describe('shouldComponentUpdate()', () => {
      it('must return true', () => {
        const nextProps = {dataTypes: [1,2,3]};
        expect(wrapper.instance().shouldComponentUpdate(nextProps, null)).toBe(true);
      });

      it('must return false', () => {
        const nextProps = props;
        expect(wrapper.instance().shouldComponentUpdate(nextProps, null)).toBe(false);
      });
    });
  });

  describe('function onChange()', () => {
    it('must call props.changeDataType', () => {
      wrapper.instance().onChange({target: {value: 11}});
      expect(changeDataTypeSpy.calledWith(11)).toBeTruthy();
    });
  });
});
