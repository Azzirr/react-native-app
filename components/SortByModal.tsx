import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

type SortOption =
  | "Most popular"
  | "Upload date: latest"
  | "Upload date: oldest";

interface Props {
  visible: boolean;
  selected: SortOption;
  onSelect: (option: SortOption) => void;
  onClose: () => void;
}

const options: SortOption[] = [
  "Most popular",
  "Upload date: latest",
  "Upload date: oldest",
];

const SortByModal: React.FC<Props> = ({
  visible,
  selected,
  onSelect,
  onClose,
}) => {
  const [localSelection, setLocalSelection] = React.useState(selected);

  React.useEffect(() => {
    setLocalSelection(selected);
  }, [selected, visible]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal}>
          <Text style={styles.header}>Sort records by:</Text>

          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.optionRow}
              onPress={() => setLocalSelection(option)}
              activeOpacity={0.7}
            >
              <View style={styles.radioCircle}>
                {localSelection === option && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.optionLabel}>{option}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              onSelect(localSelection);
              onClose();
            }}
          >
            <Text style={styles.applyText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default SortByModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#2B2D423",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 320,
    height: 400,
    backgroundColor: "#8D99AE",
    borderRadius: 24,
    padding: 24,
    justifyContent: "flex-start",
    position: "relative",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  optionLabel: {
    fontSize: 14,
    color: "#fff",
  },
  applyButton: {
    position: "absolute",
    bottom: 32,
    left: 32,
    width: 256,
    height: 40,
    backgroundColor: "#2B2D42",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
