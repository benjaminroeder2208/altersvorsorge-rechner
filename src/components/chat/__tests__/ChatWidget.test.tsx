import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// jsdom polyfill for scrollIntoView used by ChatWidget
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

import ChatWidget from "../ChatWidget";

// Mock supabase client
const invokeMock = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { functions: { invoke: (...args: unknown[]) => invokeMock(...args) } },
}));

// Mock framer-motion to bypass animation delays
vi.mock("framer-motion", async () => {
  const React = await import("react");
  const passthrough = (tag: string) =>
    React.forwardRef(({ children, ...props }: any, ref: any) =>
      React.createElement(tag, { ref, ...props }, children),
    );
  return {
    motion: new Proxy({}, { get: (_t, key: string) => passthrough(key) }),
    AnimatePresence: ({ children }: any) => children,
  };
});

async function openChatAndSend(text: string) {
  render(<ChatWidget />);
  // Wait for delayed visibility (1s timer)
  await waitFor(() => screen.getByLabelText(/Vorsorge-Assistenten/i), { timeout: 2000 });
  fireEvent.click(screen.getByLabelText(/Vorsorge-Assistenten/i));
  const textarea = await screen.findByPlaceholderText("Deine Frage...");
  fireEvent.change(textarea, { target: { value: text } });
  fireEvent.click(screen.getByLabelText("Senden"));
}

describe("ChatWidget — robust error handling", () => {
  beforeEach(() => {
    invokeMock.mockReset();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  it("zeigt eine freundliche Meldung bei 502 / Edge-Function-Fehler (kein Blank-Screen)", async () => {
    invokeMock.mockResolvedValueOnce({
      data: null,
      error: { name: "FunctionsHttpError", message: "Edge Function returned a non-2xx status code" },
    });

    await openChatAndSend("Hallo?");

    await waitFor(() =>
      expect(screen.getByText(/Entschuldigung, es gab einen Fehler/i)).toBeInTheDocument(),
    );
    // Widget bleibt sichtbar
    expect(screen.getByPlaceholderText("Deine Frage...")).toBeInTheDocument();
  });

  it("fängt Netzwerk-/Timeout-Fehler ab", async () => {
    invokeMock.mockRejectedValueOnce(new Error("Network timeout"));

    await openChatAndSend("Test");

    await waitFor(() =>
      expect(screen.getByText(/Entschuldigung, es gab einen Fehler/i)).toBeInTheDocument(),
    );
  });

  it("zeigt Fallback bei ungültiger/leerer Response", async () => {
    invokeMock.mockResolvedValueOnce({ data: {}, error: null });

    await openChatAndSend("Test");

    await waitFor(() =>
      expect(screen.getByText(/Entschuldigung, etwas ist schiefgelaufen/i)).toBeInTheDocument(),
    );
  });

  it("rendert Fallback-Reply (status 200 mit reply) als normale Antwort", async () => {
    invokeMock.mockResolvedValueOnce({
      data: { reply: "Der Assistent ist gerade nicht erreichbar.", fallback: true },
      error: null,
    });

    await openChatAndSend("Test");

    await waitFor(() =>
      expect(screen.getByText(/Der Assistent ist gerade nicht erreichbar/i)).toBeInTheDocument(),
    );
  });
});
