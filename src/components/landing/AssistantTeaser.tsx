import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "./AnimatedSection";

const questions = [
  "Welche Förderung bekomme ich mit zwei Kindern?",
  "Was passiert mit meinem alten Riester-Vertrag?",
  "Wie viel sollte ich monatlich für meine Rente sparen?",
];

export default function AssistantTeaser() {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const openAssistant = (draft: string) => {
    navigate("/ai-vorsorgeassistent", { state: { initialQuestion: draft.trim() } });
  };

  return (
    <section id="vorsorgeassistent" aria-labelledby="assistant-teaser-title" className="border-b border-border bg-background py-16 md:py-24">
      <div className="container max-w-6xl px-6">
        <AnimatedSection className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-medium text-muted-foreground">
              <MessageCircle aria-hidden="true" className="size-5 text-primary" />
              Dein persönlicher Gesprächspartner
            </div>
            <h2 id="assistant-teaser-title" className="text-3xl md:text-5xl font-semibold leading-tight">AI-Vorsorgeassistent.</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">Deine Altersvorsorge beginnt nicht mit einem Formular. Sondern mit deiner Frage.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">Besprich deine Situation, berechne deine Möglichkeiten und frage nach, wenn etwas unklar bleibt.</p>
            <Button variant="link" className="mt-5 h-auto px-0" onClick={() => openAssistant("")}>Gespräch starten<ArrowUpRight aria-hidden="true" /></Button>
          </div>
          <div className="min-w-0 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <form onSubmit={(event) => { event.preventDefault(); if (question.trim()) openAssistant(question); }}>
              <label htmlFor="assistant-question" className="mb-3 block text-sm font-semibold">Was möchtest du wissen?</label>
              <div className="flex items-center gap-2">
                <Input id="assistant-question" placeholder="Deine Frage zur Altersvorsorge …" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={500} required className="h-14 min-w-0 bg-card text-base" />
                <Button type="submit" size="icon" disabled={!question.trim()} aria-label="Frage im Vorsorgeassistenten öffnen" title="Frage im Vorsorgeassistenten öffnen" className="size-14 shrink-0"><ArrowRight aria-hidden="true" /></Button>
              </div>
            </form>
            <p className="mt-6 mb-3 text-xs text-muted-foreground">Oder beschäftigt dich gerade das?</p>
            <div className="flex flex-col items-start gap-2">
              {questions.map((example) => (
                <Button key={example} variant="outline" onClick={() => openAssistant(example)} className="h-auto max-w-full justify-start whitespace-normal rounded-lg py-3 px-4 text-left leading-relaxed bg-card hover:bg-teal-soft/40">
                  <span className="min-w-0 flex-1">{example}</span><ArrowUpRight aria-hidden="true" className="shrink-0 text-primary" />
                </Button>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-disclaimer-foreground">KI-gestützt · Kostenlos · Keine Anlageberatung</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}