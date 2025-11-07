import Icon from "@expo/vector-icons/MaterialIcons";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Search...",
}: SearchInputProps) {
  const { isDark } = useTheme();
  const hasValue = value.trim().length > 0;

  function handleClear() {
    onChangeText("");
  }

  return (
    <View className="w-full relative">
      <TextInput
        className="w-full px-4 py-3 pr-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {hasValue && (
        <TouchableOpacity
          onPress={handleClear}
          className="absolute right-3 top-0 bottom-0 justify-center items-center"
          activeOpacity={0.7}
        >
          <Icon
            name="close"
            size={20}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

