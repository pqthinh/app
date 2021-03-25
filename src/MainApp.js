import React from 'react'
import {View, Text, Button} from 'react-native'
import * as AppAuth from 'expo-app-auth';
import GGAPI from './authentication/apiGG'

const MainApp = (props)=>{
    const {route, navigation } = props
    const user = route.params.user
    console.log(props)
    // const SignOut = async () =>{
    //     try {
    //         await AppAuth.revokeAsync(config, {
    //             token: accessToken,
    //             isClientIdProvided: true,
    //         });
    //         await AsyncStorage.removeItem(StorageKey);

    //     } catch (e) {
    //         alert(`Failed to revoke token: ${e.message}`);
    //     }
    //     await navigation.navigate("Login");
    // } 
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

export default MainApp