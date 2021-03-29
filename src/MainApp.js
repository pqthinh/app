import React from 'react'
import {View, Text, Button} from 'react-native'
import { connect } from 'react-redux'
import GGAPI from './authentication/apiGG'

const MainApp = (props)=>{
    const {route, navigation } = props
    const user = route.params.user

    console.log(props, "props in mainapp")

    return(
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>Main App</Text>
            <Text>{`Hello ${user?.name}`}</Text>
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