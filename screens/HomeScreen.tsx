import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { categories } from "../constants/categories";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import SearchBar from "../components/SearchBar";
import { Video } from "../types/video";
import { fetchVideosByQuery } from "../api/youtube";
import { Image } from "react-native";

type CategoryVideos = {
  [category: string]: Video[];
};

const HomeScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [videos, setVideos] = useState<CategoryVideos>({});

  useEffect(() => {
    const fetchAll = async () => {
      const data: CategoryVideos = {};
      await Promise.all(
        categories.map(async (cat) => {
          data[cat] = await fetchVideosByQuery(cat);
        })
      );
      setVideos(data);
    };

    fetchAll();
  }, []);

  const renderCategory = (category: string) => (
    <View key={category} style={styles.categoryContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search", { query: category })}
        >
          <Text style={styles.showMore}>Show more</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={videos[category] || []}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoCard}
            onPress={() =>
              navigation.navigate("VideoDetail", {
                videoId: item.id,
                title: item.title,
                channelName: item.channelTitle || "Unknown",
                description: item.description,
                publishedAt: item.publishedAt,
              })
            }
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text numberOfLines={2}>{item.title}</Text>
            <Text style={styles.date}>{item.publishedAt.slice(0, 10)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar
        initialQuery=""
        onSearch={(query) => {
          navigation.navigate("Search", { query });
        }}
        showSettingsButton
      />
      {categories.map(renderCategory)}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    paddingLeft: 20,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
  },
  showMore: {
    fontSize: 14,
    color: "#2B2D42",
    textDecorationLine: "underline",
    paddingRight: 20,
  },
  videoCard: {
    width: 160,
    marginRight: 12,
  },
  thumbnail: {
    width: 160,
    height: 90,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: "#ccc",
  },
  date: {
    fontSize: 10,
    lineHeight: 24,
    color: "#666",
    textAlign: "right",
  },
});
