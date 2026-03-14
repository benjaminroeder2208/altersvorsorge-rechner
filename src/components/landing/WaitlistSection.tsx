import { useState, FormEvent } from "react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const WaitlistSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Vielen Dank! Wir melden uns bei Ihnen.");
    setName("");
    setEmail("");
  };

  return (
    <section id="waitlist" className="section-padding">
      <div className="container max-w-2xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <h2 className="heading-section mb-6">Erhalten Sie frühzeitigen Zugang zum Rechner</h2>
          <p className="text-body">
            Wir informieren Sie, sobald der Altersvorsorge-Rechner verfügbar ist.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ihr Name"
                className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">E-Mail</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-primary/20"
            >
              Frühzugang sichern
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WaitlistSection;
