import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NaviItems from './NaviItems';
import NaviItem from './NaviItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  it('Should render 2 <NaviItem /> components if not authenticated', () => {
    const wrapper = shallow(<NaviItems />);
    expect(wrapper.find(NaviItem)).toHaveLength(2);
  });
});
