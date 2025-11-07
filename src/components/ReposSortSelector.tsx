import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SortOrder = "stars_desc" | "stars_asc" | "name_asc" | "name_desc";

interface ReposSortSelectorProps {
  currentSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
}

const sortOptions: { value: SortOrder; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { value: "stars_desc", label: "Stars ↓", icon: "star" },
  { value: "stars_asc", label: "Stars ↑", icon: "star-outline" },
  { value: "name_asc", label: "Name A-Z", icon: "text" },
  { value: "name_desc", label: "Name Z-A", icon: "text-outline" },
];

export function ReposSortSelector({ currentSort, onSortChange }: ReposSortSelectorProps) {
  return (
    <View className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Sort by:
        </Text>
        <View className="flex-row gap-2">
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSortChange(option.value)}
              className={`px-3 py-1.5 rounded-lg flex-row items-center ${
                currentSort === option.value
                  ? "bg-primary-100 dark:bg-primary-900"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
              activeOpacity={0.7}
            >
              <Ionicons
                name={option.icon}
                size={14}
                color={currentSort === option.value ? "#2563EB" : "#6B7280"}
              />
              <Text
                className={`text-xs ml-1 ${
                  currentSort === option.value
                    ? "text-primary-600 dark:text-primary-400 font-semibold"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

