import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TimelineHoursDisplay from '../../components/Timeline-hoursDisplay';

Enzyme.configure({ adapter: new Adapter() });

describe('<TimelineHoursDisplay />', () => {
  const wrapper = shallow(<TimelineHoursDisplay />);

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders container with 24 children', () => {
    expect(wrapper.find('.TimelineHours-hours').children().length).toBe(24);
  });
});
