import Icon from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Linking, ScrollView, Text, View } from "react-native";
import { Button } from "../../components/ui/Button";
import { CircularButton } from "../../components/ui/CircularButton";
import { SafeAreaContainer } from "../../components/ui/SafeAreaContainer";
import { useRepoDetails } from "../../hooks/useRepoDetails";

export default function RepoDetailsScreen() {
  const { fullname } = useLocalSearchParams<{ fullname: string }>();
  const router = useRouter();
  const { repo, isLoading, isError } = useRepoDetails(fullname);

  function handleBackPress() {
    router.back();
  }

  async function handleOpenInBrowser() {
    if (repo?.html_url) {
      const supported = await Linking.canOpenURL(repo.html_url);
      if (supported) {
        await Linking.openURL(repo.html_url);
      }
    }
  }

  if (isLoading) {
    return (
      <SafeAreaContainer
        className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center"
      >
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaContainer>
    );
  }

  if (isError || !repo) {
    return (
      <SafeAreaContainer
        className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center px-4"
      >
        <Text className="text-gray-900 dark:text-gray-100 text-lg text-center">
          Failed to load repository details
        </Text>
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      {/* Header with Back Button */}
      <View className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-row items-center">
        <CircularButton
          onPress={handleBackPress}
          icon="arrow-back"
          size={40}
        />
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 ml-3 flex-1" numberOfLines={1}>
          {repo.name}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-6">
          {/* Repository Name */}
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {repo.full_name}
          </Text>

          {/* Description */}
          {repo.description && (
            <Text className="text-base text-gray-700 dark:text-gray-300 mb-6">
              {repo.description}
            </Text>
          )}

          {/* Stats Grid */}
          <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
            <View className="flex-row flex-wrap gap-4 mb-4">
              {/* Language */}
              {repo.language && (
                <View className="flex-row items-center">
                  <Icon name="code" size={20} color="#6B7280" />
                  <Text className="text-base text-gray-700 dark:text-gray-300 ml-2">
                    {repo.language}
                  </Text>
                </View>
              )}

              {/* Stars */}
              <View className="flex-row items-center">
                <Icon name="star" size={20} color="#F59E0B" />
                <Text className="text-base text-gray-700 dark:text-gray-300 ml-2">
                  {repo.stargazers_count} {repo.stargazers_count === 1 ? 'star' : 'stars'}
                </Text>
              </View>

              {/* Forks */}
              <View className="flex-row items-center">
                <Icon name="call-split" size={20} color="#6B7280" />
                <Text className="text-base text-gray-700 dark:text-gray-300 ml-2">
                  {repo.forks_count} {repo.forks_count === 1 ? 'fork' : 'forks'}
                </Text>
              </View>
            </View>

            {/* Status - Open */}
            <View className="flex-row justify-end">
              <View className="flex-row items-center">
                <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                <Text className="text-base text-gray-700 dark:text-gray-300">
                  Open {/* There is no status field in the API */}
                </Text>
              </View>
            </View>
          </View>

          {/* Open in Browser Button */}
          <Button
            title="Open in Browser"
            onPress={handleOpenInBrowser}
            variant="primary"
            icon="open-in-new"
            iconPosition="left"
          />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
}

