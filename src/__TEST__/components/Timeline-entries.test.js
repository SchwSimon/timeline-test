import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TimelineEntries } from '../../components/Timeline-entries';

Enzyme.configure({ adapter: new Adapter() });

describe('<TimelineEntries />', () => {
  const props = {
    timelineData: [],
    onEntrySelect: () => {},
    fetchTimeline: () => {} // TEMP
  };
  const wrapper = shallow(<TimelineEntries {...props} />);
  const defaultState = {...wrapper.state()};

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });
});
