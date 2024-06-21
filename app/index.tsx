import { Stack } from 'expo-router';

import { Welcome } from '@/templates/Welcome';

const Home = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'My home',
        }}
      />
      <Welcome />
    </>
  );
};

export default Home;
