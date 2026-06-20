// Tests für die CORS-Header der vorsorge-assistent Edge Function.
// Verhindert, dass *.lovableproject.com / *.lovable.app erneut geblockt werden ("Failed to fetch").

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { corsHeadersFor } from "./index.ts";

const ALLOWED = [
  "https://altersvorsorge-rechner.com",
  "https://www.altersvorsorge-rechner.com",
  "https://altersvorsorge-rechner.lovable.app",
  "https://a6c7ae53-19c4-4333-8378-3118fc536da9.lovableproject.com",
  "https://id-preview--a6c7ae53.lovable.app",
  "https://my-app.lovable.dev",
];

const BLOCKED = [
  "https://evil.example.com",
  "https://lovable.app.attacker.com",
  "http://altersvorsorge-rechner.com", // http statt https
  null,
];

Deno.test("CORS: erlaubt Custom-Domain + Lovable-Preview-Domains", () => {
  for (const origin of ALLOWED) {
    const h = corsHeadersFor(origin);
    assertEquals(
      h["Access-Control-Allow-Origin"],
      origin,
      `Origin ${origin} sollte gespiegelt werden`,
    );
  }
});

Deno.test("CORS: fremde Origins werden NICHT gespiegelt", () => {
  for (const origin of BLOCKED) {
    const h = corsHeadersFor(origin);
    assertEquals(
      h["Access-Control-Allow-Origin"],
      "https://altersvorsorge-rechner.com",
      `Origin ${origin} darf nicht gespiegelt werden`,
    );
  }
});

Deno.test("CORS: Standard-Header (Vary, Methods, Headers) gesetzt", () => {
  const h = corsHeadersFor("https://altersvorsorge-rechner.com");
  assertEquals(h["Vary"], "Origin");
  assertEquals(h["Access-Control-Allow-Methods"], "POST, OPTIONS");
  assertEquals(
    h["Access-Control-Allow-Headers"],
    "authorization, x-client-info, apikey, content-type",
  );
});
