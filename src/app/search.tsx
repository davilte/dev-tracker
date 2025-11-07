import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { SearchForm } from "../components/SearchForm";
import { SearchHeader } from "../components/SearchHeader";
import { SideMenu } from "../components/SideMenu";
import { UserSuggestionsList } from "../components/UserSuggestionsList";
import { SafeAreaContainer } from "../components/ui/SafeAreaContainer";
import { useGithubSearch } from "../hooks/useGithubSearch";
import { GithubUser } from "../types/github";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const { searchResults, isLoading } = useGithubSearch(searchQuery);
  const router = useRouter();

  function handleSearch() {
    if (searchQuery.trim()) {
      router.push({
        pathname: "/user/[username]",
        params: { username: searchQuery.trim() },
      });
    }
  }

  function handleUserClick(user: GithubUser) {
    router.push({
      pathname: "/user/[username]",
      params: { username: user.login },
    });
  }

  return (
    <SafeAreaContainer className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 px-4 pt-4">
        {/* Search Header */}
        <SearchHeader onMenuPress={() => setMenuVisible(true)} />

        {/* Search Form */}
        <SearchForm
          searchQuery={searchQuery}
          onQueryChange={setSearchQuery}
          onSearch={handleSearch}
        />

        {/* User Suggestions List */}
        <UserSuggestionsList
          users={searchResults}
          isLoading={isLoading}
          hasQuery={searchQuery.trim().length >= 2}
          onUserPress={handleUserClick}
        />
      </View>

      {/* Side Menu */}
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaContainer>
  );
}
