const FooterSection = () => (
  <footer className="py-12 border-t border-border">
    <div className="container max-w-5xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} altersvorsorge-depot.com</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-foreground transition-colors">Impressum</a>
          <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
        </div>
      </div>
      <div className="mt-8 text-xs text-muted-foreground/60 text-center max-w-2xl mx-auto leading-relaxed">
        Alle Angaben basieren auf dem aktuellen Stand des Gesetzgebungsverfahrens und stellen keine Anlageberatung dar.
        Der Gesetzentwurf kann sich im Laufe des parlamentarischen Verfahrens ändern.
      </div>
    </div>
  </footer>
);

export default FooterSection;