import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  useRoute,
  RouteProp,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import SearchBar from "../components/SearchBar";
import { fetchVideosByQuery } from "../api/youtube";
import SortByModal from "../components/SortByModal";

type SearchScreenRouteProp = RouteProp<RootStackParamList, "Search">;

interface SearchResult {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  description: string;
  publishedAt: string;
}
type SortOption =
  | "Most popular"
  | "Upload date: latest"
  | "Upload date: oldest";

const SearchScreen: React.FC = () => {
  const route = useRoute<SearchScreenRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchQuery, setSearchQuery] = useState(
    route.params?.query || "React Native"
  );
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("Most popular");
  const [isSortModalVisible, setSortModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.query) {
        setSearchQuery(route.params.query);
      }
    }, [route.params?.query])
  );

  useEffect(() => {
    const sorted = [...searchResults];

    if (sortBy === "Upload date: latest") {
      sorted.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sortBy === "Upload date: oldest") {
      sorted.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    }

    setSearchResults(sorted);
  }, [sortBy]);

  useEffect(() => {
    const fetch = async () => {
      const apiResults = await fetchVideosByQuery(searchQuery);
      const mapped = apiResults.map((video) => ({
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        channelName: video.channelTitle,
        description: video.description,
        publishedAt: video.publishedAt,
      }));
      setSearchResults(mapped);
    };

    fetch();
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() =>
        navigation.navigate("VideoDetail", {
          videoId: item.id,
          title: item.title,
          channelName: item.channelName,
          description: item.description,
          publishedAt: item.publishedAt,
        })
      }
    >
      <View style={styles.videoContainer}>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        </View>

        <Text style={styles.channelName}>{item.channelName}</Text>
        <Text style={styles.videoDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.publishDate}>{item.publishedAt.slice(0, 10)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar initialQuery={searchQuery} onSearch={handleSearch} />
      <Text style={styles.resultsCount}>
        {searchResults.length} results found for: "{searchQuery}"
      </Text>
      <TouchableOpacity
        style={styles.resultsHeader}
        onPress={() => setSortModalVisible(true)}
      >
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by: </Text>
          <Text style={styles.sortValue}>{sortBy}</Text>
        </View>
      </TouchableOpacity>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={renderSearchResult}
        contentContainerStyle={styles.listContainer}
      />

      <SortByModal
        visible={isSortModalVisible}
        selected={sortBy}
        onSelect={(option: SortOption) => setSortBy(option)}
        onClose={() => setSortModalVisible(false)}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    justifyContent: "flex-end",
  },
  resultsCount: {
    fontSize: 10,
    color: "#2B2D42",
  },
  sortContainer: {
    flexDirection: "row",
    color: "#2B2D42",
  },
  sortLabel: {
    fontSize: 12,
    color: "#000000",
  },
  sortValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },
  listContainer: {
    paddingBottom: 60,
  },
  resultItem: {
    marginBottom: 16,
  },
  videoContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  thumbnailContainer: {
    height: 180,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#333333",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  channelName: {
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 8,
  },
  videoDescription: {
    fontSize: 15,
    color: "#333333",
    lineHeight: 16,
  },
  publishDate: {
    fontSize: 10,
    color: "#666666",
    textAlign: "right",
    marginTop: 4,
    marginBottom: 8,
  },
  navigationBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#F0F0F0",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeNavButton: {
    borderTopWidth: 2,
    borderTopColor: "#007AFF",
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  activeNavText: {
    color: "#007AFF",
  },
});
