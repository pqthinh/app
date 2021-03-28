import React from 'react'
import {View, Text } from 'react-native'
import LoginFB from './src/authentication/FbLogin'
import RegisterScreen from './src/authentication/SignUp'
import RootApp from './src/navigation/RootStack'
import { persistor, store } from "./src/stores/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import LoadingProvider from "./src/providers/loadingProvider";

const App = ()=>{
  return (
    // <View style={{flex: 1, justifyContent: 'center',flexDirection: 'column',}}>
    //   {/* <LoginFB /> */}
    //   {/* <RegisterScreen/> */}
      
    // </View>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LoadingProvider>
          <RootApp />
        </LoadingProvider>
      </PersistGate>
    </Provider>
  )
}

export default App