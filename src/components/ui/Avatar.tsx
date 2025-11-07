import { Image } from 'expo-image';
import { View } from 'react-native';

interface AvatarProps {
  source: { uri: string };
  size?: number;
}

export function Avatar({ source, size = 40 }: AvatarProps) {
  return (
    <View
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
    >
      <Image
        source={source}
        style={{ width: size, height: size }}
        contentFit="cover"
      />
    </View>
  );
}

