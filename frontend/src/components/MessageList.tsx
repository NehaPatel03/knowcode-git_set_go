import { Conversation } from "@/pages/Messages";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MessageListProps {
  conversations: Conversation[];
  selectedChat: Conversation | null;
  onSelectChat: (conversation: Conversation) => void;
}

export const MessageList = ({ conversations, selectedChat, onSelectChat }: MessageListProps) => {
  return (
    <ScrollArea className="h-screen">
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectChat(conversation)}
            className={cn(
              "w-full p-3 flex items-start gap-3 rounded-lg transition-colors",
              selectedChat?.id === conversation.id
                ? "bg-primary/5"
                : "hover:bg-muted"
            )}
          >
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 text-left">
              <div className="flex justify-between items-start">
                <span className="font-medium">{conversation.name}</span>
                {conversation.unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {conversation.lastMessage}
              </p>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};