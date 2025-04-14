import { useState } from "react";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FiSend } from "react-icons/fi";

const sampleContacts = [
  { name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
];

export default function Messages() {
  const [conversations, setConversations] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSelectUser = (user) => {
    setCurrentUser(user);
    if (!conversations[user.name]) {
      setConversations((prev) => ({
        ...prev,
        [user.name]: [],
      }));
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && currentUser) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "me",
        timestamp: new Date(),
        status: "delivered",
        avatar: "https://i.pravatar.cc/40?img=10", // Your avatar
      };

      setConversations((prev) => ({
        ...prev,
        [currentUser.name]: [...prev[currentUser.name], message],
      }));

      setNewMessage("");
    }
  };

  const handleSelectEmoji = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-4 border-r border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Messages</h1>
          <button className="text-orange-500">New</button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="space-y-4">
          {sampleContacts.map((user) => (
            <div
              key={user.name}
              onClick={() => handleSelectUser(user)}
              className="flex items-center space-x-3 p-2 cursor-pointer hover:bg-gray-100 rounded"
            >
              <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-sm text-gray-500">Tap to open chat</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Conversation Area */}
      <main className="flex-1 p-4 flex flex-col">
        {currentUser ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div className="flex items-center space-x-3">
                <img src={currentUser.avatar} className="w-10 h-10 rounded-full" />
                <h1 className="text-xl font-bold">{currentUser.name}</h1>
              </div>
              <button className="text-orange-500">Settings</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {(conversations[currentUser.name] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender !== "me" && (
                    <img src={currentUser.avatar} className="w-8 h-8 rounded-full" />
                  )}
                  <div className="bg-white p-3 rounded-lg shadow max-w-xs">
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.timestamp.toLocaleTimeString()} • {msg.status}
                    </p>
                  </div>
                  {msg.sender === "me" && (
                    <img src={msg.avatar} className="w-8 h-8 rounded-full" />
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="relative mt-4 flex items-center space-x-2">
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="text-2xl"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50">
                  <Picker data={data} onEmojiSelect={handleSelectEmoji} />
                </div>
              )}
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-2 border border-gray-300 rounded-l"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-r"
              >
                <FiSend />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 m-auto">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
}
