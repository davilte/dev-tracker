import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";

interface CircularButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
}

export function CircularButton({
  onPress,
  icon,
  size = 40,
  backgroundColor = "bg-white dark:bg-gray-800",
  iconColor,
}: CircularButtonProps) {
  const { isDark } = useTheme();
  const defaultIconColor = isDark ? "#F9FAFB" : "#1F2937";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-full ${backgroundColor} items-center justify-center shadow-lg`}
      activeOpacity={0.7}
      style={{ width: size, height: size }}
    >
      <Ionicons name={icon} size={size * 0.5} color={iconColor || defaultIconColor} />
    </TouchableOpacity>
  );
}

