import React from 'react'
import { View } from 'react-native'
import ChatComponent from '../../../component/chat/ChatComponent'

const DetailChat = (props) => {
    const { user, navigation } = props;
    return <View>
        <ChatComponent navigation={navigation} user={user}/>
    </View>
}
export default DetailChat