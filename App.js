import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
//provider projeyi tamamen sarmalar
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';


//class yapısı oluşturduk çünkü uygulama ilk açıldığında bu kişi oturumdamı değilmi diye sorgulayacağız. ComponentWİllMount ile
class App extends Component {
  UNSAFE_componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA3x65haGj9_a0LN-ujthRuxTSYxRtYnzE',
      authDomain: 'scitech-a8f1c.firebaseapp.com',
      databaseURL: 'https://scitech-a8f1c.firebaseio.com',
      projectId: 'scitech-a8f1c',
      storageBucket: 'scitech-a8f1c.appspot.com',
      messagingSenderId: '1088829867500'
    });
  }
  render() {
    return (
      //reducers, storenin içerisinde olmalı yapı gereği.
      //Provider projeyi tamamen sarar.
      <Provider store={createStore(reducers)}>
        <View>
          <LoginForm />
        </View>
      </Provider>
    );
  }
}


export default App;