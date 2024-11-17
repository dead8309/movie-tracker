import { getMyList } from "@/api/movies";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { WatchListItem } from "@/components/watchlist-item";
import { useQuery } from "@tanstack/react-query";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

export default function MyListScreen() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-list"],
    queryFn: getMyList,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return (
      <View>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text>No data found</Text>
      </View>
    );
  }

  return (
    <Box className="flex-1">
      <VStack space="md" className="flex-1">
        <Box className="mt-2 -ml-3 w-32 rounded-2xl pl-6 py-2 bg-blue-200 border border-blue-800">
          <Heading className="text-blue-800">Watched</Heading>
        </Box>
        <FlatList
          data={data.Watched}
          numColumns={3}
          contentContainerClassName="gap-2 mx-auto"
          columnWrapperClassName="gap-3"
          renderItem={({ item }) => (
            <WatchListItem key={item.movieId} {...item} />
          )}
          keyExtractor={(item) => item.title + item.movieId}
        />

        <Box className="mt-4 -ml-3 w-32 rounded-2xl pl-6 py-2 bg-blue-200 border border-blue-800">
          <Heading className="text-blue-800">To Watch</Heading>
        </Box>
        <FlatList
          data={data["To Watch"]}
          numColumns={3}
          contentContainerClassName="gap-2 mx-auto"
          columnWrapperClassName="gap-3"
          renderItem={({ item }) => (
            <WatchListItem key={item.movieId} {...item} />
          )}
          keyExtractor={(item) => item.title + item.movieId}
        />
      </VStack>
    </Box>
  );
}
