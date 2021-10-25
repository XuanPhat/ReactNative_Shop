import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../src/Components/ShopApp/modules/auth/components/SignIn';
// import loginReducer from '../src/Components/ShopApp/modules/auth/reducers/index';
import {takeLatest} from 'redux-saga/effects';
import {all, fork} from 'redux-saga/effects';
import {shallow} from 'enzyme';
import {addNumber} from '../src/Components/Counter';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import userEvent from '@testing-library/user-event';
import SignIn from '../src/Components/ShopApp/modules/auth/components/SignIn';

// import {signInAction} from '../src/Components/ShopApp/modules/auth/actions/index';

// import sagas, {signIn} from '../src/Components/ShopApp/modules/auth/sagas';

// test('render correctly ', () => {
//   const tree = renderer.create(<Login />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// describe('change state button loading', () => {
//   it('properly captures a dispatch to change authenticated state', () => {
//     expect(
//       loginReducer(
//         {},
//         {
//           type: 'AUTH_SIGNIN',
//         },
//       ),
//     ).toEqual({
//       loading: true,
//     });
//   });
// });
jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    recordError: jest.fn(),
  });
});
jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    recordError: jest.fn(),
  });
});
// describe('test when login then fucntion sagas watcher', () => {
//   const genObject = sagas();
//   it('should wait for latest AUTH_SIGNIN action and call signIn => login successfullly', () => {
//     genObject.next().value;
//     fork(takeLatest, 'AUTH_SIGNIN', signIn);
//   });

//   // it('should be done on next iteration', () => {
//   //   expect(genObject.next().done).toBeTruthy();
//   // });
// });

it('does not show error messages when input values are valid', async () => {
  const {getByPlaceholderText, getByText, queryAllByText} = render(<SignIn />);

  const emailInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');
  const submitButton = getByText('Submit');

  await waitFor(() => {
    fireEvent.changeText(emailInput, 'tranhuuthangcoi@gmail.com');
  });

  await waitFor(() => {
    fireEvent.changeText(passwordInput, '123456');
  });

  fireEvent.press(submitButton);

  await waitFor(() => {
    expect(queryAllByText('This field is required'));
  });
});
