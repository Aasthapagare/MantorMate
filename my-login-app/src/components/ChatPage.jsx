// import React, { useState } from 'react';

// const ChatPage = ({ onClose }) => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messageInput, setMessageInput] = useState('');
//   const [allChats, setAllChats] = useState([
//     {
//       id: 1,
//       name: 'Dr. Rajesh Kumar',
//       avatar: null,
//       lastMessage: 'That sounds great! Need any help?',
//       lastMessageTime: new Date('2026-02-06T15:30:00'),
//       messages: [
//         { id: 1, text: 'Hey! How are you?', sender: 'them', time: '10:30 AM' },
//         { id: 2, text: 'I am good! Working on the project.', sender: 'me', time: '10:32 AM' },
//         { id: 3, text: 'That sounds great! Need any help?', sender: 'them', time: '10:35 AM' }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Sneha Reddy',
//       avatar: null,
//       lastMessage: 'It is scheduled for tomorrow at 3 PM',
//       lastMessageTime: new Date('2026-02-06T14:20:00'),
//       messages: [
//         { id: 1, text: 'Hi! When is the next meeting?', sender: 'them', time: '09:15 AM' },
//         { id: 2, text: 'It is scheduled for tomorrow at 3 PM', sender: 'me', time: '09:20 AM' }
//       ]
//     },
//     {
//       id: 3,
//       name: 'Arjun Verma',
//       avatar: null,
//       lastMessage: 'Here it is: github.com/project',
//       lastMessageTime: new Date('2026-02-06T11:06:00'),
//       messages: [
//         { id: 1, text: 'Can you review my code?', sender: 'them', time: '11:00 AM' },
//         { id: 2, text: 'Sure! Send me the link.', sender: 'me', time: '11:05 AM' },
//         { id: 3, text: 'Here it is: github.com/project', sender: 'them', time: '11:06 AM' }
//       ]
//     },
//     {
//       id: 4,
//       name: 'Prof. Anjali Sharma',
//       avatar: null,
//       lastMessage: 'Thanks for the update!',
//       lastMessageTime: new Date('2026-02-05T16:45:00'),
//       messages: [
//         { id: 1, text: 'Have you submitted the report?', sender: 'them', time: 'Yesterday 4:30 PM' },
//         { id: 2, text: 'Yes, submitted this morning.', sender: 'me', time: 'Yesterday 4:35 PM' },
//         { id: 3, text: 'Thanks for the update!', sender: 'them', time: 'Yesterday 4:45 PM' }
//       ]
//     }
//   ]);

//   // Sort chats by lastMessageTime (newest first)
//   const sortedChats = [...allChats].sort((a, b) => b.lastMessageTime - a.lastMessageTime);

//   const formatTime = (date) => {
//     const now = new Date();
//     const diff = now - date;
//     const hours = Math.floor(diff / (1000 * 60 * 60));
    
//     if (hours < 24) {
//       return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//     } else if (hours < 48) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//     }
//   };

//   const handleChatSelect = (chat) => {
//     setSelectedChat(chat);
//   };

//   const handleBackToList = () => {
//     setSelectedChat(null);
//   };

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!messageInput.trim() || !selectedChat) return;

//     const newMessage = {
//       id: Date.now(),
//       text: messageInput,
//       sender: 'me',
//       time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//     };

//     // Update messages for selected chat
//     setAllChats(prevChats =>
//       prevChats.map(chat =>
//         chat.id === selectedChat.id
//           ? {
//               ...chat,
//               messages: [...chat.messages, newMessage],
//               lastMessage: messageInput,
//               lastMessageTime: new Date()
//             }
//           : chat
//       )
//     );

//     // Update selected chat
//     setSelectedChat(prev => ({
//       ...prev,
//       messages: [...prev.messages, newMessage]
//     }));

//     setMessageInput('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       handleSendMessage(e);
//     }
//   };

//   return (
//     <>
//       <link 
//         href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
//         rel='stylesheet'
//       />
      

//       <div className="chat-page-wrapper">
//         {/* Chat List View */}
//         {!selectedChat ? (
//           <div className="chat-list-page">
//             {/* Header */}
//             <div className="chat-page-header">
//               <button className="chat-back-btn" onClick={onClose}>
//                 <i className='bx bx-arrow-back'></i>
//               </button>
//               <h2 className="chat-page-title">Messages</h2>
//             </div>

//             {/* Chat List */}
//             <div className="chat-list-container">
//               {sortedChats.map(chat => (
//                 <div
//                   key={chat.id}
//                   className="chat-list-item"
//                   onClick={() => handleChatSelect(chat)}
//                 >
//                   <div className="chat-list-avatar">
//                     {chat.avatar ? (
//                       <img src={chat.avatar} alt={chat.name} />
//                     ) : (
//                       <i className='bx bx-user-circle'></i>
//                     )}
//                   </div>
//                   <div className="chat-list-info">
//                     <div className="chat-list-header">
//                       <h3 className="chat-list-name">{chat.name}</h3>
//                       <span className="chat-list-time">{formatTime(chat.lastMessageTime)}</span>
//                     </div>
//                     <p className="chat-list-last-message">{chat.lastMessage}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           /* Single Chat View */
//           <div className="single-chat-page">
//             {/* Chat Header */}
//             <div className="single-chat-header">
//               <button className="chat-back-btn" onClick={handleBackToList}>
//                 <i className='bx bx-arrow-back'></i>
//               </button>
//               <div className="single-chat-user-avatar">
//                 {selectedChat.avatar ? (
//                   <img src={selectedChat.avatar} alt={selectedChat.name} />
//                 ) : (
//                   <i className='bx bx-user-circle'></i>
//                 )}
//               </div>
//               <div className="single-chat-user-info">
//                 <h3 className="single-chat-user-name">{selectedChat.name}</h3>
//                 <p className="single-chat-user-status">Online</p>
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div className="single-chat-messages">
//               {selectedChat.messages.map(message => (
//                 <div
//                   key={message.id}
//                   className={`chat-message-item ${message.sender === 'me' ? 'message-sent' : 'message-received'}`}
//                 >
//                   <div className="chat-message-bubble">
//                     <p className="chat-message-text">{message.text}</p>
//                     <span className="chat-message-time">{message.time}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Message Input */}
//             <div className="single-chat-input-area">
//               <form onSubmit={handleSendMessage} className="single-chat-input-form">
//                 <input
//                   type="text"
//                   placeholder="Type a message..."
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   className="single-chat-input-field"
//                 />
//                 <button type="submit" className="single-chat-send-btn">
//                   <i className='bx bx-send'></i>
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ChatPage;

import React, { useState, useEffect } from 'react';

const ChatPage = ({ onClose, preSelectedPerson }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [allChats, setAllChats] = useState([
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      avatar: null,
      lastMessage: 'That sounds great! Need any help?',
      lastMessageTime: new Date('2026-02-06T15:30:00'),
      messages: [
        { id: 1, text: 'Hey! How are you?', sender: 'them', time: '10:30 AM' },
        { id: 2, text: 'I am good! Working on the project.', sender: 'me', time: '10:32 AM' },
        { id: 3, text: 'That sounds great! Need any help?', sender: 'them', time: '10:35 AM' }
      ]
    },
    {
      id: 2,
      name: 'Sneha Reddy',
      avatar: null,
      lastMessage: 'It is scheduled for tomorrow at 3 PM',
      lastMessageTime: new Date('2026-02-06T14:20:00'),
      messages: [
        { id: 1, text: 'Hi! When is the next meeting?', sender: 'them', time: '09:15 AM' },
        { id: 2, text: 'It is scheduled for tomorrow at 3 PM', sender: 'me', time: '09:20 AM' }
      ]
    },
    {
      id: 3,
      name: 'Arjun Verma',
      avatar: null,
      lastMessage: 'Here it is: github.com/project',
      lastMessageTime: new Date('2026-02-06T11:06:00'),
      messages: [
        { id: 1, text: 'Can you review my code?', sender: 'them', time: '11:00 AM' },
        { id: 2, text: 'Sure! Send me the link.', sender: 'me', time: '11:05 AM' },
        { id: 3, text: 'Here it is: github.com/project', sender: 'them', time: '11:06 AM' }
      ]
    },
    {
      id: 4,
      name: 'Prof. Anjali Sharma',
      avatar: null,
      lastMessage: 'Thanks for the update!',
      lastMessageTime: new Date('2026-02-05T16:45:00'),
      messages: [
        { id: 1, text: 'Have you submitted the report?', sender: 'them', time: 'Yesterday 4:30 PM' },
        { id: 2, text: 'Yes, submitted this morning.', sender: 'me', time: 'Yesterday 4:35 PM' },
        { id: 3, text: 'Thanks for the update!', sender: 'them', time: 'Yesterday 4:45 PM' }
      ]
    }
  ]);

  // Handle pre-selected person from search
  useEffect(() => {
    if (preSelectedPerson) {
      // Find or create chat for this person
      let existingChat = allChats.find(chat => chat.name === preSelectedPerson.name);
      
      if (!existingChat) {
        // Create new chat if person not in chat list
        existingChat = {
          id: Date.now(),
          name: preSelectedPerson.name,
          avatar: null,
          lastMessage: '',
          lastMessageTime: new Date(),
          messages: []
        };
        setAllChats(prev => [existingChat, ...prev]);
      }
      
      setSelectedChat(existingChat);
    }
  }, [preSelectedPerson]);

  // ... rest of the component code remains exactly same ...
  
  const sortedChats = [...allChats].sort((a, b) => b.lastMessageTime - a.lastMessageTime);

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'me',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setAllChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: messageInput,
              lastMessageTime: new Date()
            }
          : chat
      )
    );

    setSelectedChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  return (
    <>
      <link 
        href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' 
        rel='stylesheet'
      />
      
      {/* ... existing style tag ... */}

      <div className="chat-page-wrapper">
        {/* Chat List View */}
        {!selectedChat ? (
          <div className="chat-list-page">
            <div className="chat-page-header">
              <button className="chat-back-btn" onClick={onClose}>
                <i className='bx bx-arrow-back'></i>
              </button>
              <h2 className="chat-page-title">Messages</h2>
            </div>

            <div className="chat-list-container">
              {sortedChats.map(chat => (
                <div
                  key={chat.id}
                  className="chat-list-item"
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="chat-list-avatar">
                    {chat.avatar ? (
                      <img src={chat.avatar} alt={chat.name} />
                    ) : (
                      <i className='bx bx-user-circle'></i>
                    )}
                  </div>
                  <div className="chat-list-info">
                    <div className="chat-list-header">
                      <h3 className="chat-list-name">{chat.name}</h3>
                      <span className="chat-list-time">{formatTime(chat.lastMessageTime)}</span>
                    </div>
                    <p className="chat-list-last-message">{chat.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Single Chat View - remains same */
          <div className="single-chat-page">
            <div className="single-chat-header">
              <button className="chat-back-btn" onClick={handleBackToList}>
                <i className='bx bx-arrow-back'></i>
              </button>
              <div className="single-chat-user-avatar">
                {selectedChat.avatar ? (
                  <img src={selectedChat.avatar} alt={selectedChat.name} />
                ) : (
                  <i className='bx bx-user-circle'></i>
                )}
              </div>
              <div className="single-chat-user-info">
                <h3 className="single-chat-user-name">{selectedChat.name}</h3>
                <p className="single-chat-user-status">Online</p>
              </div>
            </div>

            <div className="single-chat-messages">
              {selectedChat.messages.map(message => (
                <div
                  key={message.id}
                  className={`chat-message-item ${message.sender === 'me' ? 'message-sent' : 'message-received'}`}
                >
                  <div className="chat-message-bubble">
                    <p className="chat-message-text">{message.text}</p>
                    <span className="chat-message-time">{message.time}</span>
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
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="single-chat-input-field"
                />
                <button type="submit" className="single-chat-send-btn">
                  <i className='bx bx-send'></i>
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