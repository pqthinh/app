import React from 'react'
import {View, Text } from 'react-native'
import Banner from '../../../component/banner'
import CategoryComponent from '../../../component/category'

const HomeScreen = (props) => {
    return (
        <View>
            <Banner />
            <CategoryComponent />
        </View>
    )
}

export default HomeScreen