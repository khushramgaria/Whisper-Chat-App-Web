import { View, Text, Pressable } from "react-native";
import React from "react";
import { Chat } from "@/types";
import { Image } from "expo-image";
import { formatDistanceToNow } from "date-fns";

const ChatItem = ({
  chat,
  onPress,
  isNewChatItem = false,
}: {
  chat: Chat;
  onPress: () => void;
  isNewChatItem?: boolean;
}) => {
  const participant = chat.participant;

  const isOnline = true;
  const isTyping = false;
  const hasUnread = false;

  return (
    <Pressable
      className="flex-row items-center py-3 active:opacity-70 border-b border-surface-light"
      onPress={onPress}
    >
      {/* avatar & online indicator */}
      <View className="relative">
        <Image
          source={
            participant.avatar === ""
              ? require("../../assets/images/dummy-profile.png")
              : participant.avatar
          }
          style={{ width: 48, height: 48, borderRadius: 999 }}
        />
        {isOnline && !isNewChatItem && (
          <View className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-[3px] border-surface" />
        )}
      </View>

      {/* chat info */}
      <View className="flex-1 ml-4">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-lg font-medium ${hasUnread ? "text-primary" : "text-foreground"}`}
          >
            {participant.name}
          </Text>

          {!isNewChatItem ? (
            <View className="flex-row items-center gap-2">
              {hasUnread && (
                <View className="w-2.5 h-2.5 bg-primary rounded-full" />
              )}
              <Text className="text-xs text-subtle-foreground">
                {chat.lastMessageAt
                  ? formatDistanceToNow(new Date(chat.lastMessageAt), {
                      addSuffix: false,
                    })
                  : ""}
              </Text>
            </View>
          ) : (
            <Text
              className={`text-sm ${isOnline ? "text-primary" : "text-subtle-foreground"}`}
            >
              {isOnline ? "Online" : "Offline"}
            </Text>
          )}
        </View>
        {!isNewChatItem ? (
          <View className="flex-row items-center justify-between mt-1">
            {isTyping ? (
              <Text className="text-primary text-sm italic">typing...</Text>
            ) : (
              <Text
                className={`text-sm flex-1 mr-3 ${hasUnread ? "text-foreground font-medium" : "text-subtle-foreground"}`}
                numberOfLines={1}
              >
                {chat.lastMessage?.text || "No messages yet"}
              </Text>
            )}
          </View>
        ) : (
          <Text className="text-subtle-foreground">{participant.email}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default ChatItem;
