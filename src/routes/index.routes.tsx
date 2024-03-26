import React from "react";
import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./auth.routes";

const Routes: React.FC = () => {
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <NavigationContainer theme={theme}>
      <AuthRoutes />
    </NavigationContainer>
  );
};

export default Routes;
