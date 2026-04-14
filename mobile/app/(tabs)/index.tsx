import ChatItem from "@/components/chat/ChatItem";
import Header from "@/components/chat/Header";
import EmptyUI from "@/components/ui/EmptyUI";
import { useChats } from "@/hooks/useChats";
// import { chats } from "@/lib/dummyChats";
import { Chat } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

const ChatsTab = () => {
  const router = useRouter();
  const { data: chats, isLoading, error } = useChats();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-surface">
        <ActivityIndicator size={"large"} color={"#F4A261"} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-surface">
        <Text className="text-red-500">Failed to load chats</Text>
      </View>
    );
  }

  const handleChatPress = async (chat: Chat) => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      },
    });
  };

  return (
    <View className="flex-1 bg-surface">
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={() => handleChatPress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <EmptyUI
            title="No Chats Yet"
            subtitle="Start a Conversation!"
            iconName="chatbubble-outline"
            iconColor="#6B6B70"
            iconSize={64}
            buttonLabel="New Chat"
            onPressButton={() => console.log("pressed")}
          />
        }
      />
    </View>
  );
};

export default ChatsTab;
