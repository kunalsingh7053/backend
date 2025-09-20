
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { toast } from 'react-toastify';


const Home = () => {
  // State variables
  const [chatSessions, setChatSessions] = useState([
    {
      id: 1,
      title: 'Chat 1',
      messages: [
        { sender: 'ai', text: 'Hello! How can I help you today?' }
      ]
    }
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chatNameInput, setChatNameInput] = useState('');

  // Get active chat messages
  const activeChat = chatSessions.find((c) => c.id === activeChatId);
  const messages = activeChat ? activeChat.messages : [];

  // Send message handler
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessage = { sender: 'user', text: input };
    setChatSessions((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setChatSessions((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, { sender: 'ai', text: 'AI response to: ' + newMessage.text }] }
            : chat
        )
      );
    }, 600);
  };

  // Show modal for chat name
  const handleCreateChat = () => {
    setChatNameInput('');
    setShowModal(true);
  };

  // Handle modal submit
  const handleModalSubmit = (e) => {
    e.preventDefault();
    let chatName = chatNameInput.trim();
    if (!chatName) chatName = `Chat ${chatSessions.length + 1}`;
    const newId = chatSessions.length + 1;
    const newChat = {
      id: newId,
      title: chatName,
      messages: [{ sender: 'ai', text: 'New chat started. How can I help?' }]
    };
    setChatSessions([...chatSessions, newChat]);
    setActiveChatId(newId);
    setShowModal(false);
        toast.success('Creating a new chat session!')

  };

  // Switch chat session
  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setSidebarOpen(false);
  };

  // Delete chat handler
  const handleDeleteChat = (id) => {
    setChatSessions((prev) => prev.filter((chat) => chat.id !== id));
    // If deleted chat is active, switch to first available chat
    if (activeChatId === id) {
      const remaining = chatSessions.filter((chat) => chat.id !== id);
      setActiveChatId(remaining.length > 0 ? remaining[0].id : null);
    }
    toast.info('Chat session deleted.');
  };

  // Responsive sidebar toggle
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar (desktop only) */}
      <Sidebar
        chatSessions={chatSessions}
        activeChatId={activeChatId}
        handleSelectChat={handleSelectChat}
        handleCreateChat={handleCreateChat}
        handleDeleteChat={handleDeleteChat}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Sidebar toggle button (mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-white shadow p-2 rounded-full"
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay for sidebar on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden" onClick={toggleSidebar}></div>
      )}

      {/* Modal for chat name input */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xs transform animate-fadeScaleIn">
            <form onSubmit={handleModalSubmit}>
              <h3 className="text-lg font-bold mb-4 text-center">Enter Chat Name</h3>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Chat`}
                value={chatNameInput}
                onChange={e => setChatNameInput(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <button type="button" className="flex-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="flex-1 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main chat area */}
      <main className="flex-1 flex flex-col justify-between md:ml-64 pt-16 md:pt-0">
        <ChatHeader title={activeChat ? activeChat.title : 'Chat'} />
        <ChatMessages messages={messages} />
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </main>
    </div>
  );
};

export default Home;
 