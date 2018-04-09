import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NaviItems from './NaviItems';
import NaviItem from './NaviItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NaviItems />);
  });

  it('Should render 2 <NaviItem /> components if not authenticated', () => {
    expect(wrapper.find(NaviItem)).toHaveLength(2);
  });

  it('Should render 3 <NaviItem /> components if authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NaviItem)).toHaveLength(3);
  });

  it('Should has Logout component if authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(<NaviItem link="/logout">Logout</NaviItem>)).toEqual(true);
  });
});
