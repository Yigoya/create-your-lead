
import { CheckCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const About = () => {
  const highlights = [
    "3+ years of full-stack development experience",
    "Proficient in multiple front-end and back-end technologies",
    "Strong problem-solving and architectural skills",
    "Collaborative team player with excellent communication",
    "Passionate about creating intuitive user experiences",
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="section-container">
        <AnimatedSection>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            I'm a passionate full-stack developer with a focus on creating elegant solutions to complex problems.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection animation="fade-in-right">
            <div className="rounded-2xl overflow-hidden shadow-xl glass-card relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent mix-blend-overlay z-0"></div>
              <div className="aspect-square md:aspect-auto md:h-[30rem] relative z-10 overflow-hidden flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="text-3xl font-display font-bold mb-4">Yigermal Abebe</h3>
                  <p className="text-muted-foreground mb-6">Full Stack Developer</p>
                  <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
                  <p className="italic text-foreground/80">
                    "I'm dedicated to crafting solutions that not only solve problems but also provide exceptional user experiences."
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-left">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-semibold">My Journey</h3>
              <p className="text-muted-foreground">
                I'm a full-stack developer with expertise in creating robust web and mobile applications. 
                My passion for technology and problem-solving has driven me to master multiple technologies 
                and frameworks, allowing me to build comprehensive solutions from front-end to back-end.
              </p>
              <p className="text-muted-foreground">
                I specialize in React, Next.js, Flutter, and backend technologies like Spring Boot, 
                Express, and Django. This versatility allows me to approach projects holistically, 
                ensuring seamless integration between all components of an application.
              </p>
              
              <div className="mt-8">
                <h4 className="font-display text-xl font-semibold mb-4">Highlights</h4>
                <ul className="space-y-3">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
