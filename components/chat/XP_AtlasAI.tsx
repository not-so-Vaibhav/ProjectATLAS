"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { Send, X, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

type Message = {
  role: "user" | "bot";
  content: string;
};

const SUGGESTIONS = [
  "Who is Vaibhav?",
  "Tell me about Solace",
  "What are his key projects?",
  "What is his tech stack?",
  "How can I contact him?"
];

// Lightweight, safe markdown formatter for Atlas AI responses
function FormattedMessage({ content }: { content: string }) {
  // Split into paragraphs / lines
  const lines = content.split("\n");

  return (
    <div className="space-y-2 text-[13.5px] leading-relaxed break-words">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-1" />;

        // Check for unordered list item
        const isBullet = trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ");
        const textContent = isBullet ? trimmed.replace(/^[\s•*-]+\s*/, "") : trimmed;

        // Parse inline bold, code, and links
        const parsedElements = parseInlineFormatting(textContent);

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-1">
              <span className="text-atlas-gold text-xs mt-1 shrink-0">◆</span>
              <span className="flex-1">{parsedElements}</span>
            </div>
          );
        }

        return <p key={lineIdx}>{parsedElements}</p>;
      })}
    </div>
  );
}

function parseInlineFormatting(text: string): React.ReactNode[] {
  // Regex to match **bold**, `code`, and [text](url)
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-atlas-gold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-atlas-ink/10 text-atlas-gold text-xs font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link
            key={index}
            href={href}
            className="text-atlas-gold underline underline-offset-2 hover:text-white transition-colors"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-atlas-gold underline underline-offset-2 hover:text-white transition-colors"
        >
          {label}
        </a>
      );
    }
    return part;
  });
}

export function XP_AtlasAI() {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hello! I am **Atlas'AI**, the digital intelligence layer of Vaibhav Bariyar's digital headquarters. Ask me anything about his projects, background, skills, or startup work."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingNotice, setLoadingNotice] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, loadingNotice]);

  // Floating animation for the logo
  useEffect(() => {
    if (!logoRef.current) return;

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
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(chatRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.25,
        ease: "power3.in",
        onComplete: () => {
          if (chatRef.current) chatRef.current.style.display = "none";
        }
      });
    }
  }, [isOpen]);

  const handleLogoMouseEnter = () => {
    gsap.to(logoRef.current, { scale: 1.08, duration: 0.3, ease: "back.out(1.7)" });
  };

  const handleLogoMouseLeave = () => {
    gsap.to(logoRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage = queryText.trim();
    setInput("");

    // Build clean history for backend (skip initial greeting and any previous error banners)
    const currentHistory = messages
      .filter(
        (m) =>
          !m.content.includes("having a moment connecting") &&
          !m.content.includes("I am **Atlas'AI**") &&
          !m.content.includes("I am Vaibhav Bariyar's portfolio assistant")
      )
      .map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content
      }))
      .slice(-8);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setLoadingNotice(null);

    // Warmup timer notice if server takes > 3s
    const warmupTimer = setTimeout(() => {
      setLoadingNotice("Connecting to Atlas server...");
    }, 3000);

    const callApi = async () => {
      const res = await fetch("https://vaibhav-ai-fswn.onrender.com/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: currentHistory
        })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }
      return await res.json();
    };

    try {
      let data;
      try {
        data = await callApi();
      } catch (firstAttemptErr) {
        // Auto-retry once after 800ms for temporary 503/network spikes
        console.warn("First attempt failed, retrying in 800ms...", firstAttemptErr);
        await new Promise((r) => setTimeout(r, 800));
        data = await callApi();
      }

      clearTimeout(warmupTimer);
      setLoadingNotice(null);

      const botReply =
        data.answer ||
        data.reply ||
        "I received your message, but had trouble generating a complete answer.";

      setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      console.error("Chat error after retries:", error);
      clearTimeout(warmupTimer);
      setLoadingNotice(null);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I am having a moment connecting to the Atlas intelligence server. The AI service is currently experiencing high demand. Please try asking again in a few seconds."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sendQuery(input);
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "bot",
        content:
          "Hello! I am **Atlas'AI**, the digital intelligence layer of Vaibhav Bariyar's digital headquarters. Ask me anything about his projects, background, skills, or startup work."
      }
    ]);
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div
        ref={chatRef}
        className="pointer-events-auto mb-4 w-[340px] sm:w-[400px] hidden flex-col rounded-2xl overflow-hidden shadow-2xl border bg-atlas-black/95 text-atlas-white"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor: "var(--color-border, rgba(255, 255, 255, 0.12))",
          height: "520px",
          maxHeight: "calc(100vh - 120px)"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-atlas-gold animate-pulse" />
              <span className="absolute w-4 h-4 rounded-full bg-atlas-gold/20 animate-ping" />
            </div>
            <div>
              <h3 className="font-bold text-xs tracking-widest uppercase text-atlas-gold flex items-center gap-1.5">
                Atlas&apos;AI
                <Sparkles className="w-3 h-3 text-atlas-gold/80" />
              </h3>
              <p className="text-[10px] text-atlas-muted">Headquarters Intelligence Layer</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-atlas-muted hover:text-atlas-white"
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-atlas-muted hover:text-atlas-white"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar flex flex-col">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-sm transition-all ${
                msg.role === "user"
                  ? "bg-atlas-gold text-black font-medium self-end rounded-br-xs shadow-atlas-gold/10"
                  : "bg-white/[0.06] text-atlas-ink self-start rounded-bl-xs border border-white/10"
              }`}
            >
              {msg.role === "user" ? msg.content : <FormattedMessage content={msg.content} />}
            </div>
          ))}

          {/* Loading & Status indicator */}
          {isLoading && (
            <div className="bg-white/[0.06] text-atlas-ink self-start rounded-2xl rounded-bl-xs border border-white/10 px-4 py-3 max-w-[85%] space-y-2">
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-atlas-gold animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-atlas-gold animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-atlas-gold animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              {loadingNotice && (
                <p className="text-[11px] text-atlas-muted italic animate-pulse">{loadingNotice}</p>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips (shown when few messages) */}
        {messages.length <= 2 && !isLoading && (
          <div className="px-3 pb-2 pt-1 border-t border-white/5 bg-white/[0.02]">
            <p className="text-[10px] font-mono text-atlas-muted uppercase tracking-wider mb-1.5 px-1">
              Suggested Prompts
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto custom-scrollbar">
              {SUGGESTIONS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendQuery(prompt)}
                  className="text-[11px] text-left px-2.5 py-1 rounded-full border border-atlas-gold/25 bg-atlas-gold/5 hover:bg-atlas-gold/15 text-atlas-white hover:border-atlas-gold/50 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-white/[0.03]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Vaibhav's projects, skills..."
              className="w-full bg-white/[0.06] border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-xs text-atlas-white placeholder-atlas-muted focus:outline-none focus:border-atlas-gold/60 focus:bg-white/[0.08] transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 p-2 rounded-full bg-atlas-gold text-black hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:bg-atlas-gold/30 disabled:text-atlas-muted transition-all"
              aria-label="Send message"
            >
              {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5 ml-0.5" />}
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
        className="pointer-events-auto relative w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-transform flex-shrink-0 cursor-pointer border-2 border-atlas-gold/30 hover:border-atlas-gold"
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

