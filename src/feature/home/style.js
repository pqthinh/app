import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    ItemFlex: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 10,
    },
    ListProduct: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: "center",
    },
    ItemProduct: {
        marginHorizontal: 10,
        marginVertical: 10,
    }
})

export default styles