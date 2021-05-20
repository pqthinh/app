import React from "react";
import { Text, View, Animated } from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
import { connect } from "react-redux";
import styles from "./styles";
class Overview extends React.Component {
  state = {
    scroll: new Animated.Value(0),
  };

  componentDidMount() {
    const { scroll } = this.state;
    scroll.addListener(({ value }) => (this._value = value));
  }

  renderContent = (label) => (
    <View style={styles.content}>
      <Text>{label}</Text>
    </View>
  );

  renderForeground = () => {
    const { scroll } = this.state;
    const titleOpacity = scroll.interpolate({
      inputRange: [0, 106, 154],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.foreground}>
        <Animated.View style={{ opacity: titleOpacity }}>
          <Image
            source={{
              uri: "https://tse4.mm.bing.net/th?id=OIP.ugi6ka2-mACRREYtCh7KUAHaEK&pid=Api&P=0&w=271&h=153",
            }}
            style={{ width: "100%" }}
          />
          <Text style={styles.message}>Pham quang thing</Text>
        </Animated.View>
      </View>
    );
  };

  renderHeader = () => {
    const { scroll } = this.state;
    const opacity = scroll.interpolate({
      inputRange: [0, 160, 210],
      outputRange: [0, 0, 1],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.headerWrapper}>
        <Animated.View style={{ opacity }}>
          <Text style={styles.headerTitle}>STICKY HEADER</Text>
        </Animated.View>
      </View>
    );
  };

  render() {
    const { scroll } = this.state;

    return (
      <StickyParallaxHeader
        foreground={this.renderForeground()}
        header={this.renderHeader()}
        parallaxHeight={200}
        headerHeight={90}
        headerSize={() => {}}
        onEndReached={() => {}}
        scrollEvent={Animated.event([
          { nativeEvent: { contentOffset: { y: scroll } } },
        ])}
        tabs={[
          {
            title: "First Tab",
            content: this.renderContent("FIRST TAB"),
          },
          {
            title: "Second Tab",
            content: this.renderContent("SECOND TAB"),
          },
          {
            title: "Third Tab",
            content: this.renderContent("THIRD TAB"),
          },
          {
            title: "Fourth Tab",
            content: this.renderContent("FOURTH TAB"),
          },
          {
            title: "Fifth Tab",
            content: this.renderContent("FIFTH TAB"),
          },
        ]}
        tabTextStyle={styles.tabText}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
        tabsContainerBackgroundColor={"green"}
        tabsWrapperStyle={styles.tabsWrapper}
      ></StickyParallaxHeader>
    );
  }
}

export default connect(
  (state) => ({
    user: state.userReducer.user,
  }),
  {}
)(Overview);
