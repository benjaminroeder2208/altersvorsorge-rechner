import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* ─── types ─── */

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CalculatorContext {
  monthly_contribution: number;
  total_capital: number;
  monthly_payout: number;
  retirement_age: number;
  birth_year: number;
  children: number;
  subsidies: number;
}

declare global {
  interface Window {
    __calculatorContext?: CalculatorContext;
  }
}

/* ─── markdown-lite renderer ─── */

function renderMarkdown(text: string) {
  // Simple markdown: links, bold
  const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          className="underline underline-offset-2 font-medium hover:opacity-80"
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) {
      return <strong key={i}>{boldMatch[1]}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

/* ─── dot bounce loader ─── */

const DotBounce = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 rounded-full bg-muted-foreground/50"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const MAX_MESSAGES = 10;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Delayed visibility
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input on open
  useEffect(() => {
    if (open && !loading) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, loading]);

  // Initialize greeting on first open
  const handleOpen = useCallback(() => {
    setOpen(true);
    if (!initialized) {
      const ctx = window.__calculatorContext;
      const greeting = ctx
        ? "Hallo! Ich sehe, du hast gerade deine Altersvorsorge berechnet. Hast du Fragen zu deinen Ergebnissen oder zum Altersvorsorgedepot 2027?"
        : "Hallo! Ich bin dein Vorsorge-Assistent. Ich helfe dir bei Fragen rund um Altersvorsorge, das Altersvorsorgedepot 2027 und deine Rentenlücke. Was möchtest du wissen?";
      setMessages([{ role: "assistant", content: greeting }]);
      setInitialized(true);
    }
  }, [initialized]);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userMessageCount >= MAX_MESSAGES;

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading || limitReached) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const ctx = window.__calculatorContext ?? null;
      const { data, error } = await supabase.functions.invoke("chatbot", {
        body: {
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          calculatorContext: ctx,
        },
      });

      if (error) throw error;

      const reply = data?.reply ?? "Entschuldigung, etwas ist schiefgelaufen.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Entschuldigung, es gab einen Fehler. Bitte versuche es erneut." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, limitReached, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Floating Button ── */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={open ? () => setOpen(false) : handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 group"
            style={{ backgroundColor: "#1B4FD8" }}
            aria-label={open ? "Chat schließen" : "Frag den Vorsorge-Assistenten"}
            title={open ? "Chat schließen" : "Frag den Vorsorge-Assistenten"}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-6 h-6 text-white" />
                </motion.span>
              ) : (
                <motion.span key="sparkle" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] flex flex-col rounded-2xl shadow-2xl border border-border overflow-hidden bg-background"
            style={{ height: "min(520px, 80vh)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 text-white shrink-0" style={{ backgroundColor: "#1B4FD8" }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold text-sm">Vorsorge-Assistent</span>
              </div>
              <button onClick={() => setOpen(false)} className="hover:opacity-80 transition-opacity" aria-label="Schließen">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Disclaimer bar */}
            <div className="px-4 py-1.5 bg-muted text-[10px] text-muted-foreground shrink-0">
              KI-Assistent · Keine Anlageberatung · Angaben ohne Gewähr
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "text-white rounded-[12px_12px_4px_12px]"
                        : "bg-secondary text-foreground rounded-[12px_12px_12px_4px]"
                    }`}
                    style={msg.role === "user" ? { backgroundColor: "#1B4FD8" } : undefined}
                  >
                    {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-[12px_12px_12px_4px]">
                    <DotBounce />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Limit message */}
            {limitReached && (
              <div className="px-4 py-2 text-xs text-muted-foreground text-center border-t border-border shrink-0">
                Für eine neue Unterhaltung bitte die Seite neu laden.
              </div>
            )}

            {/* Input */}
            {!limitReached && (
              <div className="flex items-end gap-2 px-3 py-3 border-t border-border shrink-0">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  placeholder="Deine Frage..."
                  rows={1}
                  className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50 max-h-20 overflow-y-auto"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: "#1B4FD8" }}
                  aria-label="Senden"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
