import { View, FlatList, ActivityIndicator } from "react-native";
import { chats } from "@/lib/dummyChats";
import ChatItem from "@/components/chat/ChatItem";
import EmptyUI from "@/components/ui/EmptyUI";
import NewChatHeader from "@/components/chat/NewChatHeader";
import SearchBar from "@/components/chat/SearchBar";
import { Chat } from "@/types";
import { useUsers } from "@/hooks/useUsers";

export default function NewChatModal() {
  const { data: users, isLoading, error } = useUsers();
  const handleChatPress = (item) => {};

  console.log("users: ", users);

  // const chats: Chat[] = [];
  return (
    <View className="flex-1 bg-surface">
      <NewChatHeader />
      {isLoading ? (
        <View className="flex-1 justify-center items-center bg-surface">
          <ActivityIndicator size={"large"} color={"#F4A261"} />
        </View>
      ) : (
        <>
          <View className="px-5">
            <SearchBar />
          </View>
          <FlatList
            data={chats}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ChatItem
                chat={item}
                onPress={() => handleChatPress(item)}
                isNewChatItem
              />
            )}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 16,
              paddingBottom: 24,
            }}
            ListEmptyComponent={
              <EmptyUI
                title="No Users found"
                subtitle="Try a different Search Term"
                iconName="person-outline"
                iconColor="#6B6B70"
                iconSize={64}
              />
            }
          />
        </>
      )}
    </View>
  );
}
