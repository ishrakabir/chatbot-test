"use client";
import { useState } from "react";
import { query } from "./service/chat";

export default function Chat() {
 const [messages, setMessages] = useState<string[]>([]); // Stores the chat messages
  const [message, setMessage] = useState(""); // Stores the current user input message
  const [client, setClient] = useState<string[]>([]); // Stores the source of each message (User or AI)

  // Function to send a message to the backend
  const getMessage = async (input: any) => {
    console.log(input);
    const res = await fetch("api/chat", {
      method: "POST",
      body: JSON.stringify(input),
    });
    return res;
  };

  // Function to handle the form submission (when the user sends a message)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Update the state to store the user's message
    setMessages((current) => [...current, message]);
    setClient((current) => [...current, "user : "]);

    // Send the user's message to the backend and wait for the response
    getMessage({ question: message }).then(async (response) => {
      try {
        const data = await response.json();
        console.log(data);

      if (data === "") {
        setMessages((current) => [...current, "I am unavailable right now!"]);
        setClient((current) => [...current, "AI : "]);
      }
    });

    // Clear the input field after sending the message
    setMessage("");
  };


  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col h-screen">
  {messages.length > 0 ? ( // Check if there are any messages to display
    messages.map((m, index) => // Map through the messages array and display each message
      (
        <div
          className="flex p-3 shadow-lg mb-4 rounded-lg bg-slate-50" // CSS classes for styling the chat message container
          key={(index + 1) * 2000} // React key to uniquely identify each chat message
        >
          <div className="mx-3 w-14" key={(index + 1) * 10}> // Styling for the client/source of the message (User or AI)
            {client[index]} // Display the client/source of the message (User or AI) based on the index
          </div>
          <div key={index} className="w-80"> // Styling for the actual message content
            {" "}
            {m} // Display the message content
          </div>
        </div>
      )
    )
  ) : (
    <div>No messages yet.</div> // If there are no messages, display a message indicating that there are no messages yet
  )}
  <form onSubmit={handleSubmit}> // Form to submit new user messages
    <input
      className="fixed w-full max-w-md bottom-10 p-2 rounded-lg border border-gray-100 shadow-lg outline-none"
      placeholder="Say Something..." // Placeholder text for the input field
      value={message} // Bind the input value to the "message" state variable
      onChange={(event) => setMessage(event.target.value)} // Handle changes in the input field and update the "message" state variable
    />
  </form>
</div>
  );
}
