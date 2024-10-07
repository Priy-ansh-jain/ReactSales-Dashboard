import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { IoSendOutline } from "react-icons/io5";

const socket = io('http://localhost:5000'); // Connect to the server

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
      socket.emit('chat message', input);
      setInput('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
      <div className="bg-gray-100 p-4 rounded-lg h-[30vw] overflow-y-auto mb-4 bg-hero-pattern bg-cover">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-white rounded-lg shadow-md">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-2 flex-1 w-3/4"
          placeholder="Type your message..."
        />
        <button type="submit" className=" bg-[#e79529] text-white p-2 ml-2  rounded-full text-3xl shadow-lg hover:translate-x-1"><IoSendOutline />
        </button>
      </form>
    </div>
  );
};

export default Chat;
