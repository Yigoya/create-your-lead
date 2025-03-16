
import AnimatedSection from "./AnimatedSection";
import { Code2, Coffee, Laptop, Lightbulb, Rocket, Users } from "lucide-react";

const StorySection = () => {
  const storyItems = [
    {
      icon: <Lightbulb className="w-8 h-8 text-accent" />,
      title: "The Concept",
      description:
        "Every great solution starts with understanding the problem. I work closely with clients to define clear objectives and vision.",
    },
    {
      icon: <Code2 className="w-8 h-8 text-accent" />,
      title: "The Stack",
      description:
        "With expertise in React, Next.js, Flutter, Spring Boot, and more, I select the right tools for each unique challenge.",
    },
    {
      icon: <Laptop className="w-8 h-8 text-accent" />,
      title: "The Implementation",
      description:
        "Clean code, intuitive interfaces, and robust architecture are my priorities when bringing ideas to life.",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "The Collaboration",
      description:
        "I believe in transparent communication and collaborative workflows to ensure project success.",
    },
    {
      icon: <Coffee className="w-8 h-8 text-accent" />,
      title: "The Process",
      description:
        "From initial wireframes to final deployment, my process is methodical, iterative, and focused on excellence.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-accent" />,
      title: "The Launch",
      description:
        "Delivering on time and exceeding expectations is my commitment to every project I undertake.",
    },
  ];

  return (
    <section id="story" className="py-20 md:py-32">
      <div className="section-container">
        <AnimatedSection>
          <h2 className="section-title">My Development Journey</h2>
          <p className="section-subtitle">
            The path I take from concept to completion, creating digital experiences that solve real problems.
          </p>
        </AnimatedSection>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-accent/20 via-accent to-accent/20 rounded-full"></div>

          {/* Story items */}
          <div className="space-y-24">
            {storyItems.map((item, index) => (
              <AnimatedSection
                key={index}
                animation={index % 2 === 0 ? "fade-in-right" : "fade-in-left"}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-full md:w-5/12 glass-card p-6 rounded-xl ${
                    index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary/50 rounded-lg">{item.icon}</div>
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>

                {/* Circle marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-accent border-4 border-background"></div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
