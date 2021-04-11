import React from 'react'
import {View, Text } from 'react-native'
import RootApp from './src/navigation/RootStack'
import { persistor, store } from "./src/stores/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import LoadingProvider from "./src/providers/loadingProvider";
import HomeDrawer from './src/drawer/HomeDrawer';
let moment = require('moment');
require("moment/locale/vi")
moment.locale('vi-VN');

const App = ()=>{
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LoadingProvider>
          {/* <RootApp /> */}
          <HomeDrawer />
        </LoadingProvider>
      </PersistGate>
    </Provider>
  )
}

export default App