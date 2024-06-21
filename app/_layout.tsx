// eslint-disable-next-line import/no-extraneous-dependencies
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { Text, View } from 'react-native';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Layout() {
  return (
    <>
      <Stack />
      <View className="flex-row">
        <View className="flex-1 items-center">
          <MaterialIcons name="lightbulb" size={24} color="black" />
          <Text className="h-12 content-center">rkskekf</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="h-12 content-center">rkskekf</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="h-12 content-center">rkskekf</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="h-12 content-center">rkskekf</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="h-12 content-center">rkskekf</Text>
        </View>
      </View>
    </>
  );
}
