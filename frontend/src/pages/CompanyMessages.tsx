import { useState } from "react";

import { MessageList } from "@/components/MessageList";
import { ChatInterface } from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";
import { CompanySidebar } from "@/components/CompanySidebar";


export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  unreadCount: number;
  avatar: string;
  messages: Message[];
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  
  // Sample data - in a real app this would come from an API
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Mahila SHG",
      lastMessage: "Thank you for your order",
      unreadCount: 2,
      avatar: "/public/shgimg.png",
      messages: [
        {
          id: "1",
          text: "Thank you for your order",
          sender: "Mahila SHG",
          timestamp: new Date(),
          isRead: false
        }
      ]
    },
    {
      id: "2",
      name: "XYZ Group",
      lastMessage: "When can we expect delivery?",
      unreadCount: 0,
      avatar: "/public/shgimg.png",
      messages: [
        {
          id: "2",
          text: "When can we expect delivery?",
          sender: "XYZ Group",
          timestamp: new Date(),
          isRead: true
        }
      ]
    }
  ]);

  const handleSendMessage = (text: string) => {
    if (!selectedChat) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "Me",
      timestamp: new Date(),
      isRead: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedChat.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: text
        };
      }
      return conv;
    }));
  };

  const handleChatSelect = (conversation: Conversation) => {
    // Mark messages as read when selecting chat
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversation.id) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg => ({ ...msg, isRead: true }))
        };
      }
      return conv;
    }));
    setSelectedChat(conversation);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CompanySidebar/>
      <div className="flex flex-1 gap-0">
        <Card className="w-80 border-r rounded-none">
          <MessageList 
            conversations={conversations}
            selectedChat={selectedChat}
            onSelectChat={handleChatSelect}
          />
        </Card>
        <div className="flex-1">
          {selectedChat ? (
            <ChatInterface
              conversation={selectedChat}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;