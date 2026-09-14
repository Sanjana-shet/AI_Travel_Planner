import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Trash2,
  Compass,
  ArrowRight,
  User,
  Coffee,
  Map,
  BookOpen,
} from "lucide-react";
import { sendChatToGemini } from "../../services/AIChatService";
import { toast } from "sonner";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggested prompts
  const suggestions = [
    {
      icon: <Map className="h-3.5 w-3.5 text-amber-600" />,
      label: "Coorg 3-Day Plan",
      text: "Can you plan a detailed 3-day itinerary for Coorg, including best sights and stays?",
    },
    {
      icon: <Coffee className="h-3.5 w-3.5 text-amber-600" />,
      label: "Mysore Local Foods",
      text: "What are the must-eat local dishes in Mysore and where can I find them?",
    },
    {
      icon: <Compass className="h-3.5 w-3.5 text-amber-600" />,
      label: "Hampi Heritage Sites",
      text: "Tell me about Hampi's architecture and the key monuments to visit.",
    },
    {
      icon: <BookOpen className="h-3.5 w-3.5 text-amber-600" />,
      label: "Basic Kannada Phrases",
      text: "Teach me some basic Kannada phrases that would be useful for a traveller.",
    },
  ];

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("kaveri_chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Default initial welcome message
      const welcome = [
        {
          role: "model",
          content:
            "**Namaskara!** 🙏 Welcome to Karunadu Travels. I am **Kaveri**, your personal AI guide to the magnificent state of Karnataka!\n\nI can help you plan custom itineraries, discover local cuisines, translate Kannada phrases, or find hidden heritage spots. How can I help you explore Karnataka today? 🎒✨",
          timestamp: new Date().toISOString(),
        },
      ];
      setMessages(welcome);
      localStorage.setItem("kaveri_chat_history", JSON.stringify(welcome));
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("kaveri_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages or open state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Notify user with a gentle pulse if chatbot is closed and there are new messages
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    // Clear input box
    setInput("");

    // Add user message
    const userMsg = {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Call Gemini service
      const botResponse = await sendChatToGemini(updatedMessages);

      if (botResponse) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: botResponse,
            timestamp: new Date().toISOString(),
          },
        ]);
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect with Kaveri. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "I apologize, I'm having trouble connecting to the network right now. Please try again in a moment! Dhanyavadagalu. 🙏",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your chat history with Kaveri?")) {
      const welcome = [
        {
          role: "model",
          content:
            "**Namaskara!** 🙏 Reset successful. I am **Kaveri**, your Karnataka tour guide. Ask me anything about Coorg, Gokarna, Mysore, Hampi, and more!",
          timestamp: new Date().toISOString(),
        },
      ];
      setMessages(welcome);
      localStorage.setItem("kaveri_chat_history", JSON.stringify(welcome));
      toast.success("Chat history cleared");
    }
  };

  // Basic custom markdown parser for clean bubbles without third-party markdown module
  const parseMarkdown = (text) => {
    if (!text) return "";
    let escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold text: **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold text-slate-800 dark:text-white'>$1</strong>");

    // Bullet points
    let lines = escaped.split("\n");
    let inList = false;
    let result = [];

    for (let line of lines) {
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        if (!inList) {
          result.push('<ul class="list-disc pl-5 my-1.5 space-y-1">');
          inList = true;
        }
        result.push(`<li>${line.trim().substring(2)}</li>`);
      } else {
        if (inList) {
          result.push("</ul>");
          inList = false;
        }
        result.push(line);
      }
    }
    if (inList) {
      result.push("</ul>");
    }

    return result.join("<br />");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              mb-4 w-[calc(100vw-32px)] sm:w-[400px] h-[550px] max-h-[80vh]
              bg-white/95 backdrop-blur-lg border border-slate-200/90
              rounded-3xl shadow-2xl flex flex-col overflow-hidden
            "
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold border border-white/30 shadow-inner">
                    🧭
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wide flex items-center gap-1.5">
                    Kaveri AI <Sparkles className="h-3 w-3 animate-bounce" />
                  </h3>
                  <p className="text-[10px] text-amber-100/95 font-semibold">Your Karnataka Tour Guide</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-all"
                  title="Clear Chat History"
                >
                  <Trash2 className="h-4 w-4 text-white/90" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-thin scrollbar-thumb-slate-200">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  } items-end gap-2`}
                >
                  {msg.role !== "user" && (
                    <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm border border-amber-200/50">
                      🧭
                    </div>
                  )}
                  <div
                    className={`
                      max-w-[78%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed shadow-sm
                      ${
                        msg.role === "user"
                          ? "bg-slate-900 text-white rounded-br-none"
                          : "bg-white text-slate-700 border border-slate-200/60 rounded-bl-none"
                      }
                    `}
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                  />
                  {msg.role === "user" && (
                    <div className="h-7 w-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 shadow-sm border border-slate-300/40">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Suggestions: Only show when messages are short or user just started */}
              {messages.length <= 2 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] text-slate-500 font-bold mb-2 flex items-center gap-1">
                    💡 Try asking Kaveri:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug.text)}
                        className="
                          flex items-center justify-between text-left p-2.5 
                          bg-white hover:bg-amber-50/50 border border-slate-200/60 
                          hover:border-amber-200 rounded-xl text-xs font-semibold text-slate-700
                          transition-all duration-200 shadow-sm group
                        "
                      >
                        <div className="flex items-center gap-2">
                          {sug.icon}
                          <span>{sug.label}</span>
                        </div>
                        <ArrowRight className="h-3 w-3 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Typing Loader */}
              {isLoading && (
                <div className="flex justify-start items-end gap-2">
                  <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm border border-amber-200/50">
                    🧭
                  </div>
                  <div className="bg-white border border-slate-200/60 text-slate-700 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Kaveri River, Coorg, Hampi..."
                disabled={isLoading}
                className="
                  flex-1 bg-slate-50 border border-slate-200 hover:border-slate-300 
                  focus:border-amber-400 focus:bg-white rounded-2xl px-4 py-2.5 
                  text-xs text-slate-800 outline-none transition duration-200
                  placeholder-slate-400 disabled:opacity-50
                "
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="
                  p-2.5 rounded-2xl bg-slate-900 text-white 
                  hover:bg-amber-600 disabled:bg-slate-100 disabled:text-slate-300
                  active:scale-95 transition duration-200 shadow-md flex items-center justify-center
                "
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessage(false);
        }}
        className="
          h-14 w-14 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600
          text-white shadow-xl hover:shadow-amber-500/25 flex items-center justify-center 
          relative border border-amber-400/20 outline-none
        "
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white animate-spin-once" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white" />
            <Sparkles className="h-3.5 w-3.5 absolute -top-1 -right-0.5 text-amber-100 animate-pulse bg-amber-600 rounded-full border border-amber-400" />
            
            {/* New Message / Attention Pulse */}
            {hasNewMessage && (
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}

            {/* Gentle ambient border pulse when not open */}
            <span className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-ping opacity-25"></span>
          </>
        )}
      </motion.button>
    </div>
  );
}
