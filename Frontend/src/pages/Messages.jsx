import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { LuPaperclip } from "react-icons/lu";

import "bootstrap/dist/css/bootstrap.min.css";

// Connect to backend using Socket.io
const socket = io.connect("http://localhost:5000");

// Dummy logged-in user (Replace this with actual authentication logic)
const loggedInUser = { id: 999, name: "Me" };

// Define contacts
const contacts = [
  { id: 1, name: "Midhun", role: "Frontend Developer" },
  { id: 2, name: "Bob", role: "Backend Developer" },
  { id: 3, name: "Charlie", role: "UI/UX Designer" },
  { id: 4, name: "David", role: "Project Manager" },
];

export default function messages() {
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [status, setStatus] = useState({}); // ✅ Stores message status (sent/failed)

  // Register user on mount
  useEffect(() => {
    socket.emit("register", loggedInUser.id);
    console.log("Registered with server as:", loggedInUser.id);

    // ✅ Listen for incoming messages
    socket.on("message", (msg) => {
      console.log("New message received:", msg);

      setMessages((prev) => ({
        ...prev,
        [msg.senderId === loggedInUser.id ? msg.receiverId : msg.senderId]: [
          ...(prev[msg.senderId === loggedInUser.id ? msg.receiverId : msg.senderId] || []),
          msg,
        ],
      }));

      // ✅ Mark message as sent
      setStatus((prev) => ({
        ...prev,
        [msg.tempId]: "sent",
      }));
    });

    return () => {
      socket.off("message");
    };
  }, []);

  // ✅ Send message function
  const sendMessage = async () => {
    if (!message.trim() && !file) return;

    let fileUrl = null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fileUrl = response.data.fileUrl;
      } catch (error) {
        console.error("Error uploading file:", error);
        setStatus((prev) => ({ ...prev, tempId: "failed" }));
        return;
      }
    }

    const tempId = Date.now(); // Temporary ID to track message status
    const msgData = {
      tempId, // Track message
      senderId: loggedInUser.id,
      receiverId: activeContact.id,
      text: message.trim() || null,
      fileUrl,
    };

    try {
      socket.emit("message", msgData);
      console.log(" Message sent:", msgData);

      setMessages((prev) => ({
        ...prev,
        [activeContact.id]: [...(prev[activeContact.id] || []), msgData],
      }));

      // Show "Message Sent"
      setStatus((prev) => ({ ...prev, [tempId]: "sent" }));
    } catch (error) {
      console.error("Message failed:", error);
      // Show "Message Not Sent "
      setStatus((prev) => ({ ...prev, [tempId]: "failed" }));
    }

    setMessage("");
    setFile(null);
  };

  return (
    
      <div className="chat-container d-flex">
        <div className="contacts-list">
          <ul className="list-unstyled">
            {contacts.map((contact) => (
              <li key={contact.id}>
                <button
                  className={`btn w-100 text-start mb-2 py-2 px-3 ${
                    activeContact.id === contact.id ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => setActiveContact(contact)}
                >
                  <strong>{contact.name}</strong>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {contact.role}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="chat-box">
          <div className="chat-header d-flex justify-content-between align-items-center p-2">
            <div>
              <h5 className="mb-0">{activeContact.name}</h5>
              <small className="text-muted">{activeContact.role}</small>
            </div>
          </div>

          <div className="chat-body">
            {(messages[activeContact.id] || []).map((msg, index) => (
              <div key={index} className={`message ${msg.senderId === loggedInUser.id ? "sent" : "received"}`}>
                {msg.text && <p>{msg.text}</p>}
                {msg.fileUrl && (
                  <a href={`http://localhost:5000${msg.fileUrl}`} target="_blank" rel="noopener noreferrer">
                    📄 View File
                  </a>
                )}

                {/* ✅ Message Sent / Failed Status */}
                {status[msg.tempId] === "sent" && <small className="message-status">✅ Sent</small>}
                {status[msg.tempId] === "failed" && <small className="message-status error">❌ Not Sent</small>}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <label className="attach-btn">
              <LuPaperclip  size={20} />
              <input type="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.docx" />
            </label>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
            <button onClick={sendMessage} className="send-btn">Send</button>
          </div>
        </div>
      </div>
    
  );
}
