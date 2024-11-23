import React from "react";
import { View } from "react-native";

const withDevTools = (WrappedComponent: React.ComponentType) => {
  return (props: any) => (
    <View style={{ flex: 1 }}>
      <WrappedComponent {...props} />
    </View>
  );
};

// Make sure to use a default export here
export default withDevTools;
