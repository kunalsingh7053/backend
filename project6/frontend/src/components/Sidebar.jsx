import React from 'react';

const Sidebar = ({ chatSessions, activeChatId, handleSelectChat, handleCreateChat, sidebarOpen, toggleSidebar }) => (
  <>
    {/* Overlay for mobile when sidebar is open */}
    {sidebarOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={toggleSidebar}></div>
    )}
    <div
      className={`fixed md:fixed top-0 left-0 h-full w-72 max-w-[90vw] bg-white shadow-lg z-40 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        ${sidebarOpen ? 'block' : 'hidden'} md:block md:w-64 rounded-r-xl md:rounded-none`
      }
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Chats</span>
        <button className="md:hidden" onClick={toggleSidebar}>
          <span className="text-xl">×</span>
        </button>
      </div>
      <div className="p-4 border-b">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          onClick={handleCreateChat}
        >
          + New Chat
        </button>
      </div>
      <ul className="p-2 md:p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-140px)]">
        {chatSessions.map((chat) => {
          const lastMsg = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : '';
          return (
            <li
              key={chat.id}
              className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${activeChatId === chat.id ? 'bg-blue-100 font-bold' : ''}`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <div className="font-semibold truncate">{chat.title}</div>
              <div className="text-xs text-gray-500 truncate max-w-full">{lastMsg}</div>
            </li>
          );
        })}
      </ul>
    </div>
  </>
);

export default Sidebar;
