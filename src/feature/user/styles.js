import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    // backgroundColor: "pink"
    backgroundColor: "#f0f0f0",
  },
  imageLogo: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    // backgroundColor: "pink",
  },
  Logo: {
    marginVertical: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  up: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  down: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "#000",
    textAlign: "center",
    // width: 400,
    fontSize: 23,
    marginVertical: 20,
  },
  textInputContainer: {
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.9)", //a = alpha = opacity
  },
  textInput: {
    width: 280,
    height: 45,
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "pink",
  },
  updateButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkseagreen",
  },
  loginButtonTitle: {
    fontSize: 18,
    color: "white",
  },
  facebookButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: "center",
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: "black",
  },
  textOR: {
    flex: 1,
    textAlign: "center",
  },
  divider: {
    flexDirection: "row",
    height: 40,
    width: 298,
    justifyContent: "center",
    alignItems: "center",
  },
  clearBoth: {
    height: 20,
  },
  goToLogin: {
    marginVertical: 40,
  },
});

export default styles;
