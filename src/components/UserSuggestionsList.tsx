import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { GithubUser } from "../types/github";
import { UserListItem } from "./UserListItem";

interface UserSuggestionsListProps {
  users: GithubUser[];
  isLoading: boolean;
  hasQuery: boolean;
  onUserPress: (user: GithubUser) => void;
}

export function UserSuggestionsList({
  users,
  isLoading,
  hasQuery,
  onUserPress,
}: UserSuggestionsListProps) {
  const { isDark } = useTheme();

  if (isLoading && hasQuery) {
    return (
      <View className="py-4 items-center">
        <ActivityIndicator
          size="small"
          color={isDark ? "#E5E7EB" : "#374151"}
        />
      </View>
    );
  }

  if (!isLoading && users.length > 0) {
    return (
      <View className="flex-1">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Suggestions
        </Text>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <UserListItem user={item} onPress={onUserPress} />
          )}
          keyExtractor={(item) => item.login}
          className="bg-white dark:bg-gray-800 rounded-lg"
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  if (!isLoading && hasQuery && users.length === 0) {
    return (
      <View className="py-4 items-center">
        <Text className="text-gray-500 dark:text-gray-400">
          No users found
        </Text>
      </View>
    );
  }

  return null;
}

