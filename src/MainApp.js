import React from 'react'
import {View, Text, Button} from 'react-native'
import { connect } from 'react-redux'

import GGAPI from './feature/authentication/apiGG'
import HomeScreen from './feature/home/homeScreen/HomeScreen'

const MainApp = (props)=>{
    const {route, navigation } = props
    const user = route.params.user

    return(
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>Main App</Text>
            <Text>{`Hello ${user?.name}`}</Text>

            <HomeScreen />

            <Button onPress={ async ()=> {
                await GGAPI.signOutAsync()
                await navigation.navigate("Login");
            }} title="Signout"/>
        </View>
    )
}

export default connect(
    (state) => ({
        user: state.userReducer.user,
        isLoggedIn: !state.userReducer.userLoading,
    }),
    {
        
    }
)(MainApp)