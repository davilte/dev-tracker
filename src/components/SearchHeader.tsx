import Icon from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface SearchHeaderProps {
  onMenuPress: () => void;
}

export function SearchHeader({ onMenuPress }: SearchHeaderProps) {
  const { isDark } = useTheme();

  return (
    <View className="flex-row items-center mb-4">
      <TouchableOpacity
        onPress={onMenuPress}
        className="p-2 -ml-2"
        activeOpacity={0.7}
      >
        <Icon
          name="menu"
          size={28}
          color={isDark ? "#E5E7EB" : "#374151"}
        />
      </TouchableOpacity>
    </View>
  );
}

