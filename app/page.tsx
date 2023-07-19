"use client";
import { useState } from "react";
import { query } from "./service/chat";
 
export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]); // Type annotation added for "messages"
  const [message, setMessage] = useState("");
  const [client, setClient] = useState<string[]>([]);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages((current) => [...current, message]);
    setClient((current) => [...current, "user : "]);
 
    query({ question: message }).then((response) => {
      setMessages((current) => [...current, response]);
      setClient((current) => [...current, "AI : "]);
    });
    setMessage("");
  };
 
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col h-screen">
      {messages.length > 0 ? (
        messages.map((m, index) => (
          <div className="flex p-3 shadow-lg mb-4 rounded-lg bg-slate-50" key={(index+1)*2000}>
            <div className="mx-3 w-14" key={(index+1)*10}>
              {client[index]}
            </div>
            <div key={index} className="w-80" >
              {" "}
              {/* Add a unique "key" prop for the list items */}
              {m}
            </div>
          </div>
        ))
      ) : (
        <div>No messages yet.</div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="fixed w-full max-w-md bottom-10 p-2 rounded-lg border border-gray-100 shadow-lg outline-none"
          placeholder="Say Something..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </form>
    </div>
  );
}