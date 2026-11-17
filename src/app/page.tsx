import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { PageTransition } from "@/components/PageTransition";

export default function HomePage() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
    </PageTransition>
  );
}
