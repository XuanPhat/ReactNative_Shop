import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../src/Components/ShopApp/Login';
test('render correctly ', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
