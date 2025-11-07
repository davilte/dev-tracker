import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { Button } from "../../components/ui/Button";
import { CircularButton } from "../../components/ui/CircularButton";
import { SafeAreaContainer } from "../../components/ui/SafeAreaContainer";
import { useUserDetails } from "../../hooks/useUserDetails";

export default function UserDetailsScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const router = useRouter();
  const { user, isLoading, isError } = useUserDetails(username);

  function handleBackPress() {
    router.back();
  }

  function handleSeeRepositories() {
    router.push({
      pathname: "/repos/[username]",
      params: { username },
    });

  return (
      <SafeAreaContainer
        insetTop={false}
        className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center"
      >
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaContainer>
    );
  }

  if (isError || (!isLoading && !user)) {
    return (
      <SafeAreaContainer
        insetTop={false}
        className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center"
      >
        <Text className="text-gray-900 dark:text-gray-100 text-lg">
          User not found
        </Text>
        <View className="absolute top-12 left-4 z-10">
          <CircularButton
            onPress={handleBackPress}
            icon="arrow-back"
            size={44}
          />
        </View>
      </SafeAreaContainer>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SafeAreaContainer
      insetTop={false}
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      <ScrollView className="flex-1">
        {/* Top half - User Image */}
        <View className="h-80 bg-gray-200 dark:bg-gray-800 items-center justify-center relative">
        {/* Back Button */}
        <View className="absolute top-12 left-4 z-10">
          <CircularButton
            onPress={handleBackPress}
            icon="arrow-back"
            size={44}
          />
        </View>

        {/* User Image */}
        <Image
          source={{ uri: user.avatar_url }}
          className="w-full h-full"
          resizeMode="cover"
        />
        </View>

        {/* Bottom half - User Info */}
      <View className="px-4 pt-6 pb-8">
        {/* Name */}
        <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {user.name || user.login}
        </Text>

        {/* Email */}
        {user.email && (
          <Text className="text-base text-gray-600 dark:text-gray-400 mb-2">
            {user.email}
          </Text>
        )}

        {/* Bio */}
        {user.bio && (
          <Text className="text-base text-gray-700 dark:text-gray-300 mb-6">
            {user.bio}
          </Text>
        )}

        {/* Followers and Following */}
        <View className="flex-row items-center justify-center mb-6 py-4">
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Followers
            </Text>
            <Text className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {user.followers}
            </Text>
          </View>

          <View className="w-px h-12 bg-gray-300 dark:bg-gray-600 mx-4" />

          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Following
            </Text>
            <Text className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {user.following}
            </Text>
          </View>
        </View>

        {/* See Repositories Button */}
        <Button
          title="See repositories"
          onPress={handleSeeRepositories}
          variant="primary"
        />
      </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}

