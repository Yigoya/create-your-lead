
import { ChevronDown, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-hero-pattern pt-16">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/80 z-0"></div>
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="blur-in">
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-accent/10 text-accent mb-6">
              Full Stack Developer
            </span>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              I'm <span className="text-gradient">Yigermal Abebe</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              I build exceptional digital experiences by creating intuitive interfaces and scalable backends.
              From web and mobile apps to full-stack solutions, I bring ideas to life with clean code and thoughtful design.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={900}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#projects"
                className="inline-flex items-center justify-center h-12 px-6 font-medium text-primary-foreground transition-all rounded-md bg-accent hover:bg-accent/90 focus-ring"
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-12 px-6 font-medium text-foreground transition-all rounded-md bg-secondary hover:bg-secondary/80 focus-ring"
              >
                Contact Me
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <a href="#about" aria-label="Scroll down" className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-foreground focus-ring">
          <ChevronDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
