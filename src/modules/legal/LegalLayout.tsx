import React from "react";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, children }) => {
  return (
    <section className="flex-1 py-6 md:py-12 bg-background text-foreground">
      <div className="container mx-auto flex flex-col gap-6 px-4 max-w-4xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-primary-green">
          {title}
        </h1>
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </section>
  );
};

export default LegalLayout;
