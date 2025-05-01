import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { setCustomText } from "react-native-global-props";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
      });

      const customTextProps = {
        style: {
          fontFamily: "Poppins-Regular",
          fontSize: 16,
          color: "black",
        },
      };

      setCustomText(customTextProps);
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <AppNavigator />;
}
