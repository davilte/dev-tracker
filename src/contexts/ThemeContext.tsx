import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Appearance, useColorScheme as useRNColorScheme } from "react-native";

type ColorScheme = "light" | "dark" | "auto";

interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useRNColorScheme();
  const { setColorScheme: setNativeWindColorScheme } = useNativeWindColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("auto");
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  useEffect(() => {
    if (colorScheme === "auto") {
      setIsDark(systemColorScheme === "dark");
      // Reset to system preference
      Appearance.setColorScheme(null);
    } else {
      setIsDark(colorScheme === "dark");
      // Set explicit color scheme
      Appearance.setColorScheme(colorScheme);
      setNativeWindColorScheme(colorScheme);
    }
  }, [colorScheme, systemColorScheme, setNativeWindColorScheme]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newScheme }) => {
      if (colorScheme === "auto") {
        setIsDark(newScheme === "dark");
        setNativeWindColorScheme(newScheme || "light");
      }
    });

    return () => subscription.remove();
  }, [colorScheme, setNativeWindColorScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

