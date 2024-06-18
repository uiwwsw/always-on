import { Stack } from 'expo-router';
import { NativeWindStyleSheet } from 'nativewind';
import { View } from 'react-native';

NativeWindStyleSheet.setOutput({
  default: 'native',
});

export default function Layout() {
  return (
    <>
      <Stack />
      <View className="flex h-10 w-10 bg-slate-800" />
    </>
  );
}
