"use client"

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('response', (message) => {
      appendMessage(message.message, "agent")
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(messages)
  }, [messages])

  const sendMessage = () => {
    const valToSend = inputValue.trim()
    if (!valToSend) return;

    socket.emit('message', valToSend);
    appendMessage(valToSend, "user")
    setInputValue('');
  };

  const appendMessage = (message, sender) => {
    const newMsg = {
        sender: sender,
        content: message
    }
    setMessages((prevMessages) => [...prevMessages, newMsg]);
  }

  return (
    <div>
      <h1>Socket.IO Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
