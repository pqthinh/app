import React, { createContext, useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export const LoadingContext = createContext({});

const LoadingProvider = ({ children }) => {
  const [showLoading, setLoading] = useState(false);

  useEffect(() => {
    if(showLoading) {
      setTimeout(
        () => setLoading(false),
        10000
      );
    }
  }, [showLoading]);

  const renderLoadingView = () => {
    if (!showLoading) return null;
    return (
      <View style={styles.loadingWrapper}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" />
        </View>
      </View>
    );
  };

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        setLoading,
      }}
    >
      {children}
      {renderLoadingView()}
    </LoadingContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingBox: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingProvider;
