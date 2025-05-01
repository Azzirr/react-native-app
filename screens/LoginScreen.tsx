import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Linking } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const handleGuestLogin = () => {
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8C98B2" />

      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>

        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/app-icon.png")}
            style={styles.appIcon}
          />
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome to the best{"\n"}
            YouTube-based learning{"\n"}
            application.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleGuestLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Log in as guest</Text>
        </TouchableOpacity>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By continuing you agree with{"\n"}
            <Text
              style={styles.termsLink}
              onPress={() => Linking.openURL("https://www.google.com")}
            >
              Terms and Conditions
            </Text>{" "}
            and{" "}
            <Text
              style={styles.termsLink}
              onPress={() => Linking.openURL("https://www.youtube.com")}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8C98B2",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 100,
    alignItems: "center",
  },
  logo: {
    width: 292,
    height: 116,
    resizeMode: "contain",
  },
  iconContainer: {
    marginBottom: 60,
    alignItems: "center",
  },
  appIcon: {
    width: 128,
    height: 128,
    resizeMode: "contain",
  },
  welcomeContainer: {
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "left",
    lineHeight: 24,
  },
  loginButton: {
    width: "100%",
    height: 48,
    backgroundColor: "#2B2D42",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  termsContainer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
  },
  termsText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    textDecorationLine: "underline",
    color: "#2B2D42",
  },
});

export default LoginScreen;
