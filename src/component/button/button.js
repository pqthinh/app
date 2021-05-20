import React from "react";
import { View, Button, StyleSheet } from "react-native";
import styles from "../../feature/ManagerNews/screen/styles";

const Button = (props) => {
  const { title, ...others } = props;
  return (
    <View style={styles.wrapper}> 
      <Button title={title} {...others} style={styles.button}/>
    </View>
  );
};

export default React.memo(Button)

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        flex: 1,
        margin: 'auto'
    },
    button: {
        backgroundColor: '#add681',
        borderRadius: 5,
        padding: 5
    }
})