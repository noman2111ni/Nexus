import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Send, Phone, Video, Info, Smile } from "lucide-react";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ChatMessage } from "../../components/chat/ChatMessage";
import { ChatUserList } from "../../components/chat/ChatUserList";
import { useAuth } from "../../context/AuthContext";
import { Message } from "../../types";
import { findUserById } from "../../data/users";
import {
  getMessagesBetweenUsers,
  sendMessage,
  getConversationsForUser,
} from "../../data/messages";
import { MessageCircle } from "lucide-react";

export const ChatPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const chatPartner = userId ? findUserById(userId) : null;

  useEffect(() => {
    // Load conversations
    if (currentUser) {
      setConversations(getConversationsForUser(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    // Load messages between users
    if (currentUser && userId) {
      setMessages(getMessagesBetweenUsers(currentUser.id, userId));
    }
  }, [currentUser, userId]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !currentUser || !userId) return;

    const message = sendMessage({
      senderId: currentUser.id,
      receiverId: userId,
      content: newMessage,
    });

    setMessages([...messages, message]);
    setNewMessage("");

    // Update conversations
    setConversations(getConversationsForUser(currentUser.id));
  };

  if (!currentUser) return null;

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 border-r border-gray-200 bg-gray-100/60 backdrop-blur-sm">
        <ChatUserList conversations={conversations} />
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {chatPartner ? (
          <>
            {/* Header */}
            <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-white shadow-sm">
              <div className="flex items-center">
                <Avatar
                  src={chatPartner.avatarUrl}
                  alt={chatPartner.name}
                  size="md"
                  status={chatPartner.isOnline ? "online" : "offline"}
                  className="mr-3"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {chatPartner.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {chatPartner.isOnline ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {[Phone, Video, Info].map((Icon, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2 hover:bg-gray-100 transition"
                  >
                    <Icon size={18} />
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isCurrentUser={message.senderId === currentUser.id}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-gray-200 p-4 rounded-full mb-3">
                    <MessageCircle size={32} className="text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    No messages yet
                  </h3>
                  <p className="text-sm text-gray-500">
                    Send a message to start the conversation
                  </p>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 bg-white p-4 shadow-inner">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <Smile size={20} />
                </Button>

                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  fullWidth
                  className="flex-1 rounded-full border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />

                <Button
                  type="submit"
                  size="sm"
                  disabled={!newMessage.trim()}
                  className="rounded-full w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white transition"
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-6">
            <div className="bg-gray-200 p-6 rounded-full mb-4">
              <MessageCircle size={48} className="text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              Select a conversation
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Choose a contact from the list to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
