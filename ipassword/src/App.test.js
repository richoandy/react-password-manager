import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('<App />', () => {
  it('should render header', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.containsALlMatchingElements([
      <header></header>
    ])).to.be.true
  })
})
