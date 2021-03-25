import React from 'react'
import {View, Text } from 'react-native'
import LoginFB from './src/authentication/FbLogin'
import RegisterScreen from './src/authentication/SignUp'
import RootApp from './src/navigation/RootStack'
const App = ()=>{
  return (
    <View style={{flex: 1, justifyContent: 'center',flexDirection: 'column',}}>
      {/* <LoginFB /> */}
      {/* <RegisterScreen/> */}
      <RootApp />
    </View>
  )
}

export default App