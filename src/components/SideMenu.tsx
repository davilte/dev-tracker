import Icon from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function SideMenu({ visible, onClose }: SideMenuProps) {
  const { colorScheme, setColorScheme, isDark } = useTheme();
  const translateX = useSharedValue(-300);

  useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, { duration: 300 });
    } else {
      translateX.value = withTiming(-300, { duration: 250 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  function handleThemeChange(scheme: "light" | "dark" | "auto") {
    setColorScheme(scheme);
    // Optionally close menu after selection
    // onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1"
        onPress={onClose}
      >
        <View className="flex-1 flex-row bg-black/20">
          <Animated.View
            style={animatedStyle}
            className="w-64"
          >
            <Pressable
              className="w-64 h-full bg-white dark:bg-gray-900"
              onPress={(e) => e.stopPropagation()}
            >
            <View className="flex-1 pt-16 px-4">
              <View className="mb-8">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Menu
                </Text>
              </View>

              <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  Appearance
                </Text>
                
                <TouchableOpacity
                  className={`flex-row items-center py-3 px-3 rounded-lg mb-2 ${
                    colorScheme === "light"
                      ? "bg-primary-100 dark:bg-primary-900"
                      : "bg-transparent"
                  }`}
                  onPress={() => handleThemeChange("light")}
                >
                  <Icon
                    name="wb-sunny"
                    size={20}
                    color={colorScheme === "light" ? "#2563EB" : "#6B7280"}
                  />
                  <Text
                    className={`ml-3 text-base ${
                      colorScheme === "light"
                        ? "text-primary-600 dark:text-primary-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Light
                  </Text>
                  {colorScheme === "light" && (
                    <Icon
                      name="check"
                      size={20}
                      color="#2563EB"
                      className="ml-auto"
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-row items-center py-3 px-3 rounded-lg mb-2 ${
                    colorScheme === "dark"
                      ? "bg-primary-100 dark:bg-primary-900"
                      : "bg-transparent"
                  }`}
                  onPress={() => handleThemeChange("dark")}
                >
                  <Icon
                    name="dark-mode"
                    size={20}
                    color={colorScheme === "dark" ? "#2563EB" : "#6B7280"}
                  />
                  <Text
                    className={`ml-3 text-base ${
                      colorScheme === "dark"
                        ? "text-primary-600 dark:text-primary-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Dark
                  </Text>
                  {colorScheme === "dark" && (
                    <Icon
                      name="check"
                      size={20}
                      color="#2563EB"
                      className="ml-auto"
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-row items-center py-3 px-3 rounded-lg ${
                    colorScheme === "auto"
                      ? "bg-primary-100 dark:bg-primary-900"
                      : "bg-transparent"
                  }`}
                  onPress={() => handleThemeChange("auto")}
                >
                  <Icon
                    name="smartphone"
                    size={20}
                    color={colorScheme === "auto" ? "#2563EB" : "#6B7280"}
                  />
                  <Text
                    className={`ml-3 text-base ${
                      colorScheme === "auto"
                        ? "text-primary-600 dark:text-primary-400 font-semibold"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    System
                  </Text>
                  {colorScheme === "auto" && (
                    <Icon
                      name="check"
                      size={20}
                      color="#2563EB"
                      className="ml-auto"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            </Pressable>
          </Animated.View>
          <View className="flex-1" />
        </View>
      </Pressable>
    </Modal>
  );
}

