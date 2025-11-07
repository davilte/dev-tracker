import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { RepoItem } from "../../components/RepoItem";
import { ReposSortSelector } from "../../components/ReposSortSelector";
import { CircularButton } from "../../components/ui/CircularButton";
import { SafeAreaContainer } from "../../components/ui/SafeAreaContainer";
import { useRepos } from "../../hooks/useRepos";

export default function UserReposScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const router = useRouter();
  const { repos, isLoading, isError, sortOrder, handleSortChange } =
    useRepos(username);

  function handleBackPress() {
    router.back();
  }

  function handleRepoPress(repo: (typeof repos)[0]) {
    router.push({
      pathname: "/repo/[fullname]",
      params: { fullname: repo.full_name },
    });
  }

  if (isLoading) {
    return (
      <SafeAreaContainer className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaContainer>
    );
  }

  if (isError) {
    return (
      <SafeAreaContainer className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center px-4">
        <Text className="text-gray-900 dark:text-gray-100 text-lg text-center">
          Failed to load repositories
        </Text>
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer className="flex-1 bg-white dark:bg-gray-800">
      {/* Header with Back Button */}
      <View className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-row items-center">
        <CircularButton onPress={handleBackPress} icon="arrow-back" size={40} />
        <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 ml-3">
          {username}'s Repositories
        </Text>
      </View>

      {/* Sort Selector */}
      <ReposSortSelector
        currentSort={sortOrder}
        onSortChange={handleSortChange}
      />

      {/* Repositories List */}
      {repos.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-gray-600 dark:text-gray-400 text-base text-center">
            No repositories found
          </Text>
        </View>
      ) : (
        <FlatList
          data={repos}
          renderItem={({ item }) => (
            <RepoItem repo={item} onPress={() => handleRepoPress(item)} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          className="bg-gray-50 dark:bg-gray-900"
        />
      )}
    </SafeAreaContainer>
  );
}
