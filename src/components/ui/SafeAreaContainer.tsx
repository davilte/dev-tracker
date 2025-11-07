import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaContainerProps {
  children: ReactNode;
  insetTop?: boolean;
  insetBottom?: boolean;
  insetLeft?: boolean;
  insetRight?: boolean;
  className?: string;
}

export function SafeAreaContainer({
  children,
  insetTop = true,
  insetBottom = true,
  insetLeft = true,
  insetRight = true,
  className = "",
}: SafeAreaContainerProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insetTop ? insets.top : 0,
        paddingBottom: insetBottom ? insets.bottom : 0,
        paddingLeft: insetLeft ? insets.left : 0,
        paddingRight: insetRight ? insets.right : 0,
      }}
      className={className}
    >
      {children}
    </View>
  );
}

