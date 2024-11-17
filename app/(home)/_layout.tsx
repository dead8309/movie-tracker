import { Icon } from "@/components/ui/icon";
import { Link, Tabs } from "expo-router";
import { HomeIcon, ListTree, Menu, UserCircle } from "lucide-react-native";
import React from "react";
import { Platform, Pressable, ToastAndroid } from "react-native";

export default function HomeTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        headerTitle: "Movie Tracker",
        headerRight: () => (
          <Link href="/profile" asChild>
            <Pressable className="mr-2">
              <Icon as={UserCircle} size="xl" />
            </Pressable>
          </Link>
        ),
        headerLeft: () => (
          <Pressable
            className="ml-2"
            onPress={() => {
              ToastAndroid.show("Menu Clicked", ToastAndroid.SHORT);
            }}
          >
            <Icon as={Menu} size="xl" />
          </Pressable>
        ),
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon as={HomeIcon} size="xl" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-list"
        options={{
          title: "My List",
          tabBarIcon: ({ color }) => (
            <Icon as={ListTree} size="xl" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
