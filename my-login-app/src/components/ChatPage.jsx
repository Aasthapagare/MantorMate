import React, { useEffect, useState } from "react";

const CHAT_BASE_URL = "http://localhost:8086";

const ChatPage = ({ onClose }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [allChats, setAllChats] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState("");

  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId");
  const loggedInUserRole = (localStorage.getItem("role") || "").toString().trim().toUpperCase();

  const mapMessages = (data) =>
    data.map((msg) => ({
      id: msg.id,
      text: msg.content,
      sender: String(msg.senderId) === String(loggedInUserId) ? "me" : "them",
      seen: Boolean(msg.seen),
      time: new Date(msg.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

  const loadChatHistory = async (chat, options = {}) => {
    const { markSeen = false } = options;

    const response = await fetch(`${CHAT_BASE_URL}/chat/history?otherUser=${chat.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to load chat history");
    }

    const data = await response.json();

    if (markSeen) {
      await fetch(`${CHAT_BASE_URL}/chat/seen?otherUser=${chat.id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    }

    setSelectedChat((prev) => ({
      ...(prev || chat),
      ...chat,
      messages: mapMessages(data),
    }));
  };

  useEffect(() => {
    setLoadingUsers(true);
    setUsersError("");

    fetch(`${CHAT_BASE_URL}/chat/users`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load chat users");
        }

        return res.json();
      })
      .then((usersList) => {
        const filtered = usersList.filter(
          (user) => String(user.userId) !== String(loggedInUserId)
        );

        setAllChats(
          filtered.map((user) => ({
            id: user.userId,
            name: user.name,
            role: user.role,
            avatar: null,
            lastMessage:
              loggedInUserRole === "STUDENT"
                ? "Start chatting with your guide"
                : "Start chatting with your student",
            lastMessageTime: 0,
            messages: [],
          }))
        );
      })
      .catch((err) => {
        console.error("Users fetch error:", err);
        setUsersError(err.message || "Users load nahi ho sake.");
      })
      .finally(() => setLoadingUsers(false));
  }, [loggedInUserId, loggedInUserRole, token]);

  useEffect(() => {
    if (!selectedChat?.id) {
      return undefined;
    }

    const refreshSelectedChat = () => {
      loadChatHistory(selectedChat).catch((error) => {
        console.error("Selected chat refresh error:", error);
      });
    };

    refreshSelectedChat();
    const intervalId = window.setInterval(refreshSelectedChat, 4000);

    return () => window.clearInterval(intervalId);
  }, [selectedChat?.id, token]);

  const sortedChats = [...allChats].sort(
    (a, b) => b.lastMessageTime - a.lastMessageTime
  );

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (hours < 48) {
      return "Yesterday";
    }

    return new Date(date).toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  };

  const handleChatSelect = (chat) => {
    loadChatHistory(chat, { markSeen: true }).catch((error) => {
      console.error("History load error:", error);
    });
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!messageInput.trim() || !selectedChat) {
      return;
    }

    fetch(`${CHAT_BASE_URL}/chat/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        receiverId: selectedChat.id,
        content: messageInput,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Send failed");
        }

        return res.json();
      })
      .then((savedMessage) => {
        const newMessage = {
          id: savedMessage.id,
          text: savedMessage.content,
          sender: "me",
          seen: Boolean(savedMessage.seen),
          time: new Date(savedMessage.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setSelectedChat((prev) => ({
          ...prev,
          messages: [...prev.messages, newMessage],
        }));

        setAllChats((prev) =>
          prev.map((chat) =>
            chat.id === selectedChat.id
              ? {
                  ...chat,
                  lastMessage: messageInput,
                  lastMessageTime: new Date(),
                }
              : chat
          )
        );

        setMessageInput("");
      })
      .catch((error) => {
        console.error("Send message error:", error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSendMessage(event);
    }
  };

  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      <div className="chat-page-wrapper">
        {!selectedChat ? (
          <div className="chat-list-page">
            <div className="chat-page-header">
              <button className="chat-back-btn" onClick={onClose}>
                <i className="bx bx-arrow-back"></i>
              </button>
              <h2 className="chat-page-title">Messages</h2>
            </div>

            <div className="chat-list-container">
              {loadingUsers && (
                <div className="chat-list-empty">Loading contacts...</div>
              )}

              {!loadingUsers && usersError && (
                <div className="chat-list-empty">{usersError}</div>
              )}

              {!loadingUsers && !usersError && sortedChats.length === 0 && (
                <div className="chat-list-empty">
                  {loggedInUserRole === "STUDENT"
                    ? "No guides available for chat."
                    : "No students available for chat."}
                </div>
              )}

              {!loadingUsers &&
                !usersError &&
                sortedChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="chat-list-item"
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="chat-list-avatar">
                      {chat.avatar ? (
                        <img src={chat.avatar} alt={chat.name} />
                      ) : (
                        <i className="bx bx-user-circle"></i>
                      )}
                    </div>
                    <div className="chat-list-info">
                      <div className="chat-list-header">
                        <h3 className="chat-list-name">{chat.name}</h3>
                        <span className="chat-list-time">
                          {chat.lastMessageTime ? formatTime(chat.lastMessageTime) : chat.role}
                        </span>
                      </div>
                      <p className="chat-list-last-message">{chat.lastMessage}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="single-chat-page">
            <div className="single-chat-header">
              <button className="chat-back-btn" onClick={handleBackToList}>
                <i className="bx bx-arrow-back"></i>
              </button>

              <div className="single-chat-user-avatar">
                {selectedChat.avatar ? (
                  <img src={selectedChat.avatar} alt={selectedChat.name} />
                ) : (
                  <i className="bx bx-user-circle"></i>
                )}
              </div>

              <div className="single-chat-user-info">
                <h3 className="single-chat-user-name">{selectedChat.name}</h3>
                <p className="single-chat-user-status">Online</p>
              </div>
            </div>

            <div className="single-chat-messages">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message-item ${
                    message.sender === "me" ? "message-sent" : "message-received"
                  }`}
                >
                  <div className="chat-message-bubble">
                    <p className="chat-message-text">{message.text}</p>
                    <div className="chat-message-meta">
                      <span className="chat-message-time">{message.time}</span>
                      {message.sender === "me" && (
                        <span
                          className={`chat-message-seen ${message.seen ? "is-seen" : ""}`}
                          title={message.seen ? "Seen" : "Delivered"}
                        >
                          <i className={`bx ${message.seen ? "bx-check-double" : "bx-check"}`}></i>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="single-chat-input-area">
              <form onSubmit={handleSendMessage} className="single-chat-input-form">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  onKeyPress={handleKeyPress}
                  className="single-chat-input-field"
                />
                <button type="submit" className="single-chat-send-btn">
                  <i className="bx bx-send"></i>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatPage;
