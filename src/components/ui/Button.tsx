import Icon from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Icon.glyphMap;
  iconPosition?: "left" | "right";
}

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg items-center justify-center min-h-[48px]";
  
  const variantStyles = {
    primary: "bg-primary-600 active:bg-primary-700",
    secondary: "bg-secondary-600 active:bg-secondary-700",
    outline: "bg-transparent border-2 border-primary-600 active:border-primary-700",
  };

  const textStyles = {
    primary: "text-white font-semibold text-base",
    secondary: "text-white font-semibold text-base",
    outline: "text-primary-600 font-semibold text-base",
  };

  const disabledStyles = disabled || loading
    ? "opacity-50"
    : "";

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#2563EB" : "#FFFFFF"}
          size="small"
        />
      ) : (
        <View className="flex-row items-center">
          {icon && iconPosition === "left" && (
            <Icon
              name={icon}
              size={20}
              color={variant === "outline" ? "#2563EB" : "#FFFFFF"}
            />
          )}
          <Text className={`${textStyles[variant]} ${icon && iconPosition === "left" ? "ml-2" : ""} ${icon && iconPosition === "right" ? "mr-2" : ""}`}>
            {title}
          </Text>
          {icon && iconPosition === "right" && (
            <Icon
              name={icon}
              size={20}
              color={variant === "outline" ? "#2563EB" : "#FFFFFF"}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

