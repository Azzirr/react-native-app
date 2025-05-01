import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  showSettingsButton?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = "",
  onSearch,
  autoFocus = false,
  showSettingsButton = false,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    } else {
      navigation.navigate("Search", { query });
    }
  };

  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search videos"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoFocus={autoFocus}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
        {showSettingsButton && (
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={goToSettings}
          >
            <Ionicons name="settings-outline" size={24} color="#2B2D42" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: "auto",
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2B2D42",
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  settingsButton: {
    marginLeft: 8,
    marginRight: 9,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
