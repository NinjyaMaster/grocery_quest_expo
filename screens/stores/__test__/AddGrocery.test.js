import { expect } from '@jest/globals';
import React from 'react';
import renderer from 'react-test-renderer';

import Input from '../../../components/ui/Input';

import AddGrocery from '../AddGrocery';
import { AuthProvider } from '../../../contexts/AuthProvider';
import { AxiosProvider } from '../../../contexts/AxiosProvider';

test('the best flavor is grapefruit', () => {
  expect('2').toBe('2');
});

test('has 1 child', () => {
  const route = {
    params: {
      storeId: 44,
      storeName: 'Rite Aid',
    },
  };

  const navigation = {
    setOptions: () => {},
    goBack: () => {},
  };

  const tree = renderer.create(
    <AuthProvider>
      <AxiosProvider>
        <AddGrocery route={route} navigation={navigation} />
      </AxiosProvider>
    </AuthProvider>
  );

  //console.warn(tree);
  expect(tree.toJSON().children.length).toBe(5);

  //console.warn(treeInstance.toJSON());
  const input = tree.root.findAllByType(Input);
  //console.warn(input);
  expect(input).not.toBeNull();
  expect(input.length).toBe(4);

  const grocery1Input = tree.root.findByProps({ testID: 'grocery1' });
  // console.warn(grocery1Input);
});

// describe('<AddGrocery />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<AddGrocery />).toJSON();
//     expect(tree.children.length).toBe(1);
//   });
// });
