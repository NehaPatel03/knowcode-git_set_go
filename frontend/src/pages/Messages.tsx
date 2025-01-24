import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Image as ImageIcon } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";

interface Message {
  id: number;
  text: string;
  sender: "user" | "company";
  timestamp: Date;
}

interface Company {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
  image: string;
}

const companies: Company[] = [
  {
    id: 1,
    name: "ABC Corp",
    lastMessage: "Thank you for your order",
    unread: 2,
    image: "/public/companyimg.png",
  },
  {
    id: 2,
    name: "XYZ Industries",
    lastMessage: "When can we expect delivery?",
    unread: 0,
    image: "/public/companyimg.png",
  },
];

const Messages = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex">
        {/* Companies List */}
        <div className="w-80 border-r">
          <div className="p-4 border-b">
            <Input placeholder="Search companies..." />
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            {companies.map((company) => (
              <div
                key={company.id}
                className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-accent ${
                  selectedCompany?.id === company.id ? "bg-accent" : ""
                }`}
                onClick={() => setSelectedCompany(company)}
              >
                <img
                  src={company.image}
                  alt={company.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{company.name}</h3>
                    {company.unread > 0 && (
                      <span className="bg-primary text-white rounded-full px-2 text-sm flex items-center justify-center">
                        {company.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {company.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedCompany ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center gap-4">
                <img
                  src={selectedCompany.image}
                  alt={selectedCompany.name}
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="font-semibold">{selectedCompany.name}</h2>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent"
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t flex gap-2">
                <Button variant="outline" size="icon">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <Button onClick={sendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a company to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;