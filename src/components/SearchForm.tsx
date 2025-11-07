import { View } from "react-native";
import { Button } from "./ui/Button";
import { SearchInput } from "./ui/SearchInput";

interface SearchFormProps {
  searchQuery: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export function SearchForm({
  searchQuery,
  onQueryChange,
  onSearch,
  placeholder = "Search a dev",
}: SearchFormProps) {
  return (
    <View className="gap-4 mb-4">
      <SearchInput
        value={searchQuery}
        onChangeText={onQueryChange}
        placeholder={placeholder}
      />
      <Button
        title="Search"
        onPress={onSearch}
        disabled={!searchQuery.trim()}
      />
    </View>
  );
}

