import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import {createStore} from 'redux';
import reducer from '../../browser/action-creators';

import ItemsContainer from '../../browser/containers/ItemsContainer';
import Items from '../../browser/components/Items';

describe('<ItemsContainer />', () => {
    let items = [{name:'Obama', quantity: 1}, {name:'J.K. Rowling', quantity: 1}, {name:'Jasiu Leja', quantity: 1}]
    let wrapper;
    const store = createStore(reducer);
    store.state = {items};
    console.log(store);
    beforeEach('Create component and onChange spy', () => {
        wrapper = shallow(<ItemsContainer store={store} />);
    });
  it.only('renders three <Items /> components', () => {
    expect(wrapper.find(Items).length).to.be.equal(3);
  });

  it('has an initial state with items', () => {
      expect(wrapper.state()).to.be.deep.equal({items});
  });

  it('passes its selected item prop to <Items />', () => {
      // expect(wrapper.find(Items)[0].props().currentItem).to.be.equal({items[0]});
      // expect(wrapper.find(Items)[1].props().currentItem).to.be.equal({items[1]});
      // expect(wrapper.find(Items)[2].props().currentItem).to.be.equal({items[2]});
  });

});
