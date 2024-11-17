import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { Badge, BadgeText } from "./ui/badge";
import { Movie } from "@/types/movie";
import { HStack } from "./ui/hstack";

export function MovieItem(movie: Movie) {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="mx-2 rounded-lg flex-1">
          <HStack space="md" className="flex-1">
            <Image
              source={{
                uri: movie.poster_url,
              }}
              alt={movie.title}
              className="h-[120px] w-[120px] rounded-md"
              resizeMode="cover"
            />
            <VStack className="w-full flex-1">
              <Heading size="md" className="mb-4">
                {movie.title}
              </Heading>
              <Text size="sm" className="flex-1">
                {movie.Description}
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
            </VStack>
          </HStack>
        </Card>
      </Pressable>
    </Link>
  );
}
