import Icon from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";
import { GithubRepo } from "../types/github";

interface RepoItemProps {
  repo: GithubRepo;
  onPress?: () => void;
}

export function RepoItem({ repo, onPress }: RepoItemProps) {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-white dark:bg-gray-800 p-4 mb-3 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      {/* Repo Name */}
      <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
        {repo.name}
      </Text>

      {/* Description */}
      {repo.description && (
        <Text className="text-sm text-gray-600 dark:text-gray-400 mb-3" numberOfLines={2}>
          {repo.description}
        </Text>
      )}

      {/* Stats Row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-wrap gap-4">
          {/* Language */}
          {repo.language && (
            <View className="flex-row items-center">
              <Icon name="code" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                {repo.language}
              </Text>
            </View>
          )}

          {/* Stars */}
          <View className="flex-row items-center">
            <Icon name="star" size={16} color="#F59E0B" />
            <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              {repo.stargazers_count}
            </Text>
          </View>

          {/* Forks */}
          <View className="flex-row items-center">
            <Icon name="call-split" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              {repo.forks_count}
            </Text>
          </View>
        </View>

        {/* Status - Open */}
        <View className="flex-row items-center">
          <View className="w-2 h-2 rounded-full bg-green-500 mr-1" />
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Open
          </Text>
        </View>
      </View>
    </Component>
  );
}

