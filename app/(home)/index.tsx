import { ActivityIndicator, FlatList } from "react-native";
import { MovieItem } from "@/components/movie-item";
import { getMoviesAndShows } from "@/api/movies";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";

export default function HomeScreen() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: getMoviesAndShows,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  return (
    <Box className="bg-background-0 flex-1">
      {data && data?.length > 0 && (
        <FlatList
          data={data}
          numColumns={1}
          contentContainerClassName="gap-2 max-w-[950px] mx-auto w-full"
          renderItem={({ item }) => <MovieItem key={item.id} {...item} />}
          keyExtractor={(item) => item.title + item.id.toString()}
          ListHeaderComponent={
            <Box className="p-4 md:hidden w-full">
              <Input variant="rounded" size="md" className="w-full h-14">
                <InputField placeholder="Search for movies or shows" />
                <InputSlot className="h-10 w-10 m-1.5">
                  <InputIcon as={SearchIcon} className="text-primary-400" />
                </InputSlot>
              </Input>
            </Box>
          }
        />
      )}
    </Box>
  );
}
