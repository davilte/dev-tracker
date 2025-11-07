import { useState } from "react";
import { View } from "react-native";
import { SearchForm } from "../components/SearchForm";
import { SearchHeader } from "../components/SearchHeader";
import { SideMenu } from "../components/SideMenu";
import { UserSuggestionsList } from "../components/UserSuggestionsList";
import { useGithubSearch } from "../hooks/useGithubSearch";
import { GithubUser } from "../types/github";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const { searchResults, isLoading } = useGithubSearch(searchQuery);

  function handleSearch() {
    console.log("Searching for:", searchQuery);
    if (searchQuery.trim()) {
      console.log("User details would be fetched for:", searchQuery);
    }
  }

  function handleUserClick(user: GithubUser) {
    console.log("User clicked:", user);
    console.log("User details:", {
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      email: user.email,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
    });
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 px-4 pt-4">
        <SearchHeader onMenuPress={() => setMenuVisible(true)} />

        <SearchForm
          searchQuery={searchQuery}
          onQueryChange={setSearchQuery}
          onSearch={handleSearch}
        />

        <UserSuggestionsList
          users={searchResults}
          isLoading={isLoading}
          hasQuery={searchQuery.trim().length >= 2}
          onUserPress={handleUserClick}
        />
      </View>

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}