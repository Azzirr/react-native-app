import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

interface Props {
  isPlaying: boolean;
  onPlayPause: () => void;
  onBack: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onVolume?: () => void;
  onCast?: () => void;
}

const VideoControlsOverlay: React.FC<Props> = ({
  isPlaying,
  onPlayPause,
  onBack,
  onPrev,
  onNext,
  onVolume,
  onCast,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topLeftButton} onPress={onBack}>
        <Image
          source={require("../assets/icons/leftarrow-icon.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      <View style={styles.topRightGroup}>
        <TouchableOpacity onPress={onVolume}>
          <Image
            source={require("../assets/icons/volume-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCast} style={{ marginLeft: 16 }}>
          <Image
            source={require("../assets/icons/airplay-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.centerControls}>
        <TouchableOpacity onPress={onPrev}>
          <Image
            source={require("../assets/icons/backward-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
          <Image
            source={
              isPlaying
                ? require("../assets/icons/pause-icon.png")
                : require("../assets/icons/play-icon.png")
            }
            style={styles.playIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext}>
          <Image
            source={require("../assets/icons/forward-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoControlsOverlay;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    justifyContent: "space-between",
  },
  topLeftButton: {
    position: "absolute",
    top: 18,
    left: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  topRightGroup: {
    position: "absolute",
    top: 18,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  centerControls: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
