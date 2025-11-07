import { TouchableOpacity, View, Text } from "react-native";
import { Avatar } from "./ui/Avatar";
import { GithubUser } from "../types/github";

interface UserListItemProps {
  user: GithubUser;
  onPress: (user: GithubUser) => void;
}

export function UserListItem({ user, onPress }: UserListItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(user)}
      className="flex-row items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      activeOpacity={0.7}
    >
      <Avatar source={{ uri: user.avatar_url }} size={50} />
      <View className="ml-3 flex-1">
        <Text className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {user.login}
        </Text>
        {user.name && (
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {user.name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

