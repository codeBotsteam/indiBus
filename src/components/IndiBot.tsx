import React, { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';



interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface IndiBotProps {
  onClose: () => void;
}

const IndiBot: React.FC<IndiBotProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversationId) {
      setConversationId(Date.now().toString());
    }
  }, [conversationId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    if (message.trim() === '') return;

    setLoading(true);
    setChatHistory(prev => [...prev, { sender: 'user', text: message }]);

    try {
      const response = await fetch('https://psychic-couscous-7v964v5rwv77hrgjx-8000.app.github.dev/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          role:'user',
          conversation_id: conversationId,
        }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.response }]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="w-full max-w-lg bg-zinc-900 rounded-lg shadow-lg p-4 sm:p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-lg font-bold"
        >
          ×
        </button>

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl text-white sm:text-2xl font-semibold">IndiBus Saathi</h1>
        </div>

        <div
          ref={chatContainerRef}
          className="overflow-y-auto h-96 space-y-4 mb-4 p-4 border border-zinc-800 rounded-lg"
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-white'}`}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs p-3 rounded-lg bg-gray-900 text-white animate-pulse">
                IndiBus Saathi is typing...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="flex flex-col sm:flex-row items-center sm:space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-950 text-white text-sm sm:text-base"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-gray-600 text-white py-2 px-4 rounded-lg text-sm sm:text-base disabled:opacity-50"
            disabled={loading || !message.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndiBot;
