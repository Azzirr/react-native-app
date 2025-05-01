import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ReminderSwitchProps {
  title: string;
  subtitle: string;
  time: string;
  description: string;
}

const ReminderSwitch: React.FC<ReminderSwitchProps> = ({
  title,
  subtitle,
  time,
  description,
}) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="#2B2D42" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.settingRow}>
        <View style={styles.timeContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.timeWrapper}>
            <Ionicons name="time-outline" size={16} color="#555" />
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>

        <Pressable onPress={toggleSwitch} style={styles.switchContainer}>
          <View
            style={[
              styles.track,
              { backgroundColor: isEnabled ? "#2B2D42" : "#D1D1D6" },
            ]}
          >
            <View
              style={[
                styles.thumb,
                { transform: [{ translateX: isEnabled ? 22 : 0 }] },
              ]}
            />
          </View>
        </Pressable>
      </View>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2B2D42",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
    marginRight: 8,
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
    color: "#2B2D42",
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  track: {
    width: 46,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  description: {
    fontSize: 10,
    color: "#000000",
    marginTop: 4,
  },
});

export default ReminderSwitch;
