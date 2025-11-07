import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../../global.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { store } from "../store";

function StackWithInsets() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      className="flex-1 bg-gray-50 dark:bg-gray-900"
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <StackWithInsets />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
