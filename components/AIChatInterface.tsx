"use client";
import { Send, Sparkles, Volume2, Pause, Play } from "lucide-react";
import { useState } from "react";

import { model } from "@/lib/gemini";
interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What does the transactions table store?",
  "Which tables are risky?",
  "Show me stale tables",
  "What is the data lineage for the orders table?",
];

export default function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Hey! I'm your AI data assistant. I can help you understand your database, find data quality issues, and explore relationships. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const speakMessage = (text: string, id: string) => {
    const synth = window.speechSynthesis;

    // SAME MESSAGE → PAUSE
    if (speakingId === id && isSpeaking && !isPaused) {
      synth.pause();
      setIsPaused(true);
      return;
    }

    // SAME MESSAGE → RESUME
    if (speakingId === id && isPaused) {
      synth.resume();
      setIsPaused(false);
      return;
    }

    // NEW MESSAGE → RESET
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingId(null);
    };

    setSpeakingId(id);
    setIsSpeaking(true);
    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    const synth = window.speechSynthesis;

    synth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingId(null);
  };
  // const handleSendMessage = async (content: string) => {
  //   if (!content.trim()) return;

  //   // Add user message
  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     role: 'user',
  //     content,
  //     timestamp: new Date(),
  //   };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInputValue('');
  //   setIsLoading(true);

  //   // Simulate AI response
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
  //   const aiMessage: Message = {
  //     id: (Date.now() + 1).toString(),
  //     role: 'ai',
  //     content: `That's a great question! Based on your data, I found some interesting insights. The ${content.toLowerCase()} is important for your analytics pipeline. Would you like me to dig deeper?`,
  //     timestamp: new Date(),
  //   };
  //   setMessages((prev) => [...prev, aiMessage]);
  //   setIsLoading(false);
  // };
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // ✅ Get DB metadata
      const metadata = localStorage.getItem("dbMetadata");

      const context = metadata
        ? `Database Metadata:\n${metadata}`
        : "No database connected.";

      // ✅ Gemini Prompt Engineering 😈🔥
      //       const prompt = `
      // You are an AI Data Analyst Assistant.

      // Use the provided database metadata to answer user questions.

      // ${context}

      // User Question:
      // ${content}

      // Rules:
      // - Answer like a senior data analyst
      // - Be concise & business-focused
      // - If table mentioned → explain purpose, risks, freshness
      // - If data quality issue → highlight clearly
      // `;
      const prompt = `
You are an AI Data Intelligence Assistant.

You MUST answer ONLY using the provided database metadata.

Database Context:
${context}

User Question:
${content}

CRITICAL RULES:

- If no database metadata is available → respond EXACTLY:

"I couldn’t find any connected database metadata.  
Connect your database to begin exploring AI insights."

- If the question cannot be answered from metadata → respond EXACTLY:

"Sorry — I can only answer questions related to your connected database metadata."

STRICT RESPONSE RULES:

- Maximum 2 bullets per section
- Maximum 12 words per bullet
- No long explanations
- No repetition
- Prioritize business impact over technical detail
- Show most critical risk first

RESPONSE FORMAT:

🔎 Key Findings
• ...
• ...

⚠️ Risks
• ...
• ...

📊 Data Quality
• ...
• ...

🕒 Freshness
• ...
• ...

💼 Business Impact
• Describe real-world consequence of issues

🔥 Impact Level
• High / Medium / Low

🎯 Recommendation
• ...

✅ Confidence Score
• XX% (based only on metadata completeness)
`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: "Something went wrong with AI response 😢",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          AI Chat Assistant
        </h2>
        <p className="text-gray-400">
          Ask questions about your data in natural language
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                    : "bg-white/10 border border-white/20 text-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* MESSAGE TEXT */}
                  <p className="text-sm flex-1">{message.content}</p>

                  {/* CONTROLS */}
                  {message.role === "ai" && (
                    <div className="flex gap-2">
                      {/* PLAY / PAUSE */}
                      <button
                        onClick={() =>
                          speakMessage(message.content, message.id)
                        }
                        className="text-gray-400 hover:text-cyan-400 transition"
                      >
                        {speakingId === message.id &&
                        isSpeaking &&
                        !isPaused ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </button>

                      {/* STOP */}
                      {speakingId === message.id && isSpeaking && (
                        <button
                          onClick={stopSpeaking}
                          className="text-gray-400 hover:text-red-400 transition"
                        >
                          ⏹
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions (shown when empty) */}
        {messages.length <= 1 && (
          <div className="mb-4 space-y-2">
            <p className="text-xs text-gray-500 font-medium">
              Suggested questions:
            </p>
            <div className="space-y-2">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(question)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition border border-white/10 hover:border-white/20"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !isLoading) {
                handleSendMessage(inputValue);
              }
            }}
            placeholder="Ask me anything about your data..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition group-disabled:opacity-30" />
            <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white group-disabled:opacity-70">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Info panel */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Tip:</span> Ask about table
            relationships, data quality issues, or explore your data schema
            naturally.
          </p>
        </div>
      </div>
    </div>
  );
}
