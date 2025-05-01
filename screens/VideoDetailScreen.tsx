import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Video from "react-native-video";
import { fetchVideoStatistics } from "../api/youtube";

const { width } = Dimensions.get("window");

type DetailRoute = RouteProp<RootStackParamList, "VideoDetail">;

const VideoDetailScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<DetailRoute>();
  const { videoId, title, channelName, description, publishedAt } =
    route.params;

  const [activeTab, setActiveTab] = useState<"Details" | "Notes">("Details");
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const videoUri = "https://www.w3schools.com/html/mov_bbb.mp4";

  const [statistics, setStatistics] = useState<{
    views: string;
    likes: string;
  }>({
    views: "",
    likes: "",
  });

  useEffect(() => {
    const loadStatistics = async () => {
      const data = await fetchVideoStatistics(videoId);
      setStatistics(data);
    };
    loadStatistics();
  }, [videoId]);

  const renderTabContent = () => {
    if (activeTab === "Details") {
      return (
        <View style={styles.tabContent}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{description}</Text>

          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statisticsContainer}>
            <View style={styles.statItem}>
              <Image
                source={require("../assets/icons/views-icon.png")}
                style={styles.statIcon}
              />
              <Text style={styles.statValue}>{statistics.views} views</Text>
            </View>

            <View style={styles.statItem}>
              <Image
                source={require("../assets/icons/likes-icon.png")}
                style={styles.statIcon}
              />
              <Text style={styles.statValue}>{statistics.likes} likes</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.tabContent}>
          <Text style={styles.notesPlaceholder}>No notes yet</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.videoContainer}>
          <View style={styles.videoPlayer}>
            <Video
              source={{ uri: videoUri }}
              style={styles.videoThumbnail}
              controls={true}
              resizeMode="cover"
              paused={!isPlaying}
              onError={(e) => console.error("Video error:", e)}
            />

            {!isPlaying && (
              <TouchableOpacity
                style={styles.playButton}
                onPress={togglePlayPause}
              >
                <Image
                  source={require("../assets/adaptive-icon.png")}
                  style={styles.playIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.videoInfoContainer}>
          <Text style={styles.videoTitle}>{title}</Text>

          <View style={styles.channelInfo}>
            <View style={styles.channelAvatar}>
              <Image
                source={require("../assets/adaptive-icon.png")}
                style={styles.avatarImage}
              />
            </View>
            <Text style={styles.channelName}>{channelName}</Text>
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Details" && styles.activeTab]}
              onPress={() => setActiveTab("Details")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Details" && styles.activeTabText,
                ]}
              >
                Details
              </Text>
              {activeTab === "Details" && (
                <View style={styles.activeTabIndicator} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "Notes" && styles.activeTab]}
              onPress={() => setActiveTab("Notes")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Notes" && styles.activeTabText,
                ]}
              >
                Notes
              </Text>
              {activeTab === "Notes" && (
                <View style={styles.activeTabIndicator} />
              )}
            </TouchableOpacity>
          </View>

          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  videoContainer: {
    backgroundColor: "#888888",
    width: "100%",
  },
  videoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#17BEBB",
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  headerRightButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoPlayer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
  },
  videoControls: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  controlIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 30,
    height: 30,
    tintColor: "#FFFFFF",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 8,
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  fullscreenButton: {
    padding: 4,
  },
  fullscreenIcon: {
    width: 16,
    height: 16,
    tintColor: "#FFFFFF",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#555555",
    marginTop: 8,
  },
  progressIndicator: {
    width: "20%",
    height: "100%",
    backgroundColor: "#FF0000",
  },
  videoInfoContainer: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B2D42",
    marginBottom: 12,
  },
  channelInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  channelAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#2B2D42",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarImage: {
    width: 20,
    height: 20,
    tintColor: "#FFFFFF",
  },
  channelName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  activeTab: {},
  tabText: {
    fontSize: 12,
    color: "#888888",
  },
  activeTabText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 12,
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "100%",
    backgroundColor: "#000000",
  },
  tabContent: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    lineHeight: 20,
    color: "#333333",
    marginBottom: 16,
  },
  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B2D42",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  statIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#FFFFFF",
  },
  statValue: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  notesPlaceholder: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    paddingVertical: 20,
  },
});
