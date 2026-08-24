"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Send, X, Loader2 } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

type Message = {
  role: "user" | "bot";
  content: string;
};

export function XP_AtlasAI() {
  const { theme } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I am Vaibhav Bariyar's portfolio assistant. How can I help you today? Feel free to ask about his background, projects, skills, or creative work." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Floating animation for the logo
  useEffect(() => {
    if (!logoRef.current) return;
    
    // Continuous floating animation
    const floatAnim = gsap.to(logoRef.current, {
      y: -8,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    return () => {
      floatAnim.kill();
    };
  }, []);

  // Animate chat window open/close
  useEffect(() => {
    if (!chatRef.current) return;

    if (isOpen) {
      chatRef.current.style.display = "flex";
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(chatRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          if (chatRef.current) chatRef.current.style.display = "none";
        }
      });
    }
  }, [isOpen]);

  const handleLogoMouseEnter = () => {
    gsap.to(logoRef.current, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" });
  };

  const handleLogoMouseLeave = () => {
    gsap.to(logoRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("https://vaibhav-ai-fswn.onrender.com/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.answer || "Sorry, I couldn't understand that." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "bot", content: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      <div 
        ref={chatRef}
        className="mb-4 w-80 md:w-96 hidden flex-col rounded-2xl overflow-hidden shadow-glass border bg-atlas-black/80"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: "var(--glass-border)",
          height: "450px",
          maxHeight: "calc(100vh - 120px)"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-atlas-line/10 bg-atlas-ink/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-atlas-gold animate-status-blink" />
            <h3 className="font-bold text-sm tracking-widest uppercase text-atlas-gold">Atlas&apos;AI</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-atlas-muted hover:text-atlas-ink"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar flex flex-col">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                msg.role === "user" 
                  ? "bg-atlas-gold text-black self-end rounded-br-sm" 
                  : "bg-atlas-ink/10 text-atlas-ink self-start rounded-bl-sm border border-atlas-line/10"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-atlas-ink/10 text-atlas-ink self-start rounded-2xl rounded-bl-sm border border-atlas-line/10 px-4 py-3 max-w-[85%]">
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-atlas-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-atlas-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-atlas-gold animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form 
          onSubmit={handleSendMessage}
          className="p-3 border-t border-atlas-line/10 bg-atlas-ink/5"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Vaibhav..."
              className="w-full bg-atlas-ink/10 border border-atlas-line/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-atlas-ink placeholder-atlas-ink/40 focus:outline-none focus:border-atlas-gold/50 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 p-1.5 rounded-full bg-atlas-gold/10 text-atlas-gold hover:bg-atlas-gold hover:text-black disabled:opacity-50 disabled:hover:bg-atlas-gold/10 disabled:hover:text-atlas-gold transition-colors"
              aria-label="Send message"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button
        ref={logoRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleLogoMouseEnter}
        onMouseLeave={handleLogoMouseLeave}
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-quiet transition-shadow hover:shadow-glass flex-shrink-0"
        aria-label="Toggle Atlas AI Chat"
      >
        <Image
          src={theme === "light" ? "/AtlasAI/BotLogoLight.png" : "/AtlasAI/BotLogoDark.png"}
          alt="Atlas AI Logo"
          fill
          className="object-cover rounded-full"
          sizes="(max-width: 768px) 56px, 64px"
        />
      </button>

    </div>
  );
}
