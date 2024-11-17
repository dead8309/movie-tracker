import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen
            name="movie/[id]"
            options={{ title: "Movie", headerTitleAlign: "left" }}
          />
          <Stack.Screen
            name="profile"
            options={{ title: "Profile", headerTitleAlign: "left" }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
