"use client";

import { useState } from "react";

type Message = {
  role: "user" | "bot";
  content: any;
};

export default function ChatUI() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage: Message = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: { error: "Something went wrong" } },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white shadow text-center font-semibold text-lg">
        🍳 AI Recipe Assistant
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl shadow ${
                msg.role === "user"
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.role === "user" ? (
                msg.content
              ) : (
                <ResponseView data={msg.content} />
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 text-sm animate-pulse">Typing...</div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Enter ingredients or location..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 text-black focus:ring-red-400"
        />

        <button
          onClick={handleSend}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

type RecipeResponse = {
  type?: "recipe" | "location";
  recipe_name?: string;
  ingredients?: string[];
  steps?: string[];
  cooking_time?: string;
  difficulty?: string;
  famous_foods?: string[];
  error?: string;
};

function ResponseView({ data }: { data: RecipeResponse }) {
  if (!data) return null;

  if (data.error) {
    return <p className="text-red-500">❌ {data.error}</p>;
  }

  if (data.type === "recipe") {
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-bold">🍽️ {data.recipe_name}</h3>

        <p className="text-sm text-gray-600">
          ⏱ {data.cooking_time} • 🔥 {data.difficulty}
        </p>

        <div>
          <p className="font-semibold">🧂 Ingredients:</p>
          <ul className="list-disc ml-5 text-sm">
            {data.ingredients?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold">👨‍🍳 Steps:</p>
          <ol className="list-decimal ml-5 text-sm">
            {data.steps?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  if (data.type === "location") {
    return (
      <div>
        <h3 className="font-bold">🌍 Famous Foods</h3>
        <ul className="list-disc ml-5 text-sm">
          {data.famous_foods?.map((food, i) => (
            <li key={i}>{food}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <pre className="text-xs bg-gray-100 p-2 rounded">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
