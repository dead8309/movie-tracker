import { Stack, useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToWatchList, getMovieOrShowById } from "@/api/movies";
import { ActivityIndicator, ToastAndroid } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { StarIcon } from "lucide-react-native";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies", id],
    queryFn: () => getMovieOrShowById(Number(id)),
  });

  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => addToWatchList(id),
    onSuccess: () => {
      ToastAndroid.show("Added to watchlist", ToastAndroid.SHORT);
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching data</Text>;
  }

  if (!movie) {
    return <Text>Movie not found</Text>;
  }

  return (
    <Box className="flex-col m-2 flex-1">
      <Stack.Screen options={{ title: movie.title }} />
      <HStack space="md" className="mb-40">
        <Image
          source={movie.poster_url}
          alt={movie.title}
          className="h-[120px] w-[120px] rounded-2xl"
          resizeMode="cover"
        />
        <VStack className="w-full flex-1">
          <HStack space="md" className="mb-2 flex-1">
            <Heading size="md" className="flex-1">
              {movie.title}
            </Heading>

            <Badge className="bg-primary-800 rounded-2xl px-2 items-center gap-2">
              <BadgeText size="lg" className="text-primary-0">
                {movie.rating}
              </BadgeText>
              <Icon
                as={StarIcon}
                size="sm"
                className="h-6 w-6 fill-yellow-500"
              />
            </Badge>
          </HStack>

          <Text className="text-sm font-normal mb-2 text-typography-700">
            {movie.release_date}
          </Text>

          {movie.type === "movie" && (
            <Badge className="w-14 bg-blue-200">
              <BadgeText className="text-blue-600">Movie</BadgeText>
            </Badge>
          )}
          {movie.type === "show" && (
            <Badge className="w-14 bg-green-200">
              <BadgeText className="text-green-600">Show</BadgeText>
            </Badge>
          )}

          <HStack space="sm" className="mt-4">
            {movie.genre &&
              movie.genre.map((genre) => (
                <Badge key={genre} className="bg-secondary-0">
                  <BadgeText className="text-secondary-600">{genre}</BadgeText>
                </Badge>
              ))}
          </HStack>
        </VStack>
      </HStack>

      <VStack className="mb-20">
        <Heading size="sm" className="mb-2">
          Description
        </Heading>
        <Text size="sm">{movie.description}</Text>
      </VStack>

      <Box className="flex-row flex-1 gap-2">
        <Button
          className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 flex-1"
          onPress={() => mutateAsync(movie.id)}
        >
          <ButtonText size="sm">To Watch</ButtonText>
        </Button>
        <Button
          variant="outline"
          className="px-4 py-2 border-outline-300 flex-1"
        >
          <ButtonText size="sm" className="text-typography-600">
            Watched
          </ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
