import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { MyListMovieDetails } from "@/types/movie";

export function WatchListItem(movie: MyListMovieDetails) {
  return (
    <Link href={`/movie/${movie.movieId}`} asChild>
      <Pressable className="">
        <VStack space="md" className="">
          <Image
            source={{
              uri: movie.poster_url,
            }}
            alt={movie.title}
            className="h-[120px] w-[120px] rounded-md"
            resizeMode="cover"
          />
          <Heading size="md" className="w-[120px]">
            {movie.title}
          </Heading>
        </VStack>
      </Pressable>
    </Link>
  );
}
