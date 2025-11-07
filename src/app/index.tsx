import { Redirect } from "expo-router";

export default function Index() {
  // I would use this route to check if the user is logged in and redirect to the login screen or the main screen
  return <Redirect href="/search" />;
}