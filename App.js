import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
/*provider projeyi tamamen sarmalar*/
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'; /*npm install --save redux-thunk kurduk, dispatchle kurmuş olduğumuz actionscreaterleri tetikleyebilmemiz için gerekli.*/
import reducers from './src/reducers';
import Router from './src/Router';
/*class yapısı oluşturduk çünkü uygulama ilk açıldığında bu kişi oturumdamı değilmi diye sorgulayacağız. ComponentWİllMount ile*/
class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>  
      {/*reducers, storenin içerisinde olmalı yapı gereği. Provider projeyi tamamen sarar.*/}
        <View style={{ flex: 1 }}>
          <Router />
        </View>
      </Provider>
    );
  }
}
/*navigasyon sistemi için react-native --save react-native-router-flux kurduk*/

export default App;

