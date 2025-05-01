import "dotenv/config";

export default {
  expo: {
    name: "React Native App",
    slug: "react-native-app",
    version: "1.0.0",
    extra: {
      YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    },
  },
};
