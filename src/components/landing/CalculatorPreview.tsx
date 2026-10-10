import ChapterHeading from "./ChapterHeading";
import AltersvorsorgedepotRechner from "./AltersvorsorgedepotRechner";

const CalculatorPreview = () => (
  <section className="calculator-refresh border-y border-border bg-secondary">
    <div className="container max-w-6xl px-6 pt-16 md:pt-24"><ChapterHeading number="02" label="Deine persönliche Rechnung"><p className="text-3xl font-semibold md:text-5xl">Aus einer Idee wird dein Plan.</p></ChapterHeading></div>
    <AltersvorsorgedepotRechner />
  </section>
);

export default CalculatorPreview;