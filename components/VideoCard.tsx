import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { YouTubeVideo } from "../api/youtube";

interface VideoCardProps {
  video: YouTubeVideo;
  compact?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, compact = false }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate("VideoDetail", {
      videoId: video.id,
      title: video.title,
      channelName: video.channelTitle,
      description: video.description,
      publishedAt: video.publishedAt,
    });
  };

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={handlePress}>
        <View style={styles.compactVideoContainer}>
          <Image
            source={{ uri: video.thumbnailUrl }}
            style={styles.compactThumbnail}
          />
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>100 seconds of</Text>
          </View>
        </View>
        <View style={styles.compactDetails}>
          <Text style={styles.channelName}>Channel name</Text>
          <Text numberOfLines={2} style={styles.compactTitle}>
            {video.title}
          </Text>
          <Text style={styles.date}>{video.publishedAt}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: video.thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>100 seconds of</Text>
        </View>
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {video.title}
      </Text>
      <Text style={styles.date}>{video.publishedAt}</Text>
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: 16,
    marginBottom: 5,
  },
  thumbnailContainer: {
    position: "relative",
    marginBottom: 8,
  },
  thumbnail: {
    width: "100%",
    height: 90,
    borderRadius: 8,
  },
  durationBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00C2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: "white",
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginBottom: 4,
    color: "#000",
  },
  date: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  compactContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  compactVideoContainer: {
    position: "relative",
  },
  compactThumbnail: {
    width: 160,
    height: 90,
    borderRadius: 8,
  },
  compactDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  channelName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#000",
    marginBottom: 4,
  },
  compactTitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginBottom: 8,
  },
});
