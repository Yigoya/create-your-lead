
import { useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "./AnimatedSection";

type SkillCategory = "frontend" | "backend" | "mobile" | "tools";

interface Skill {
  name: string;
  icon: string; // using emoji as placeholder (will use SVGs in production)
  proficiency: number;
  category: SkillCategory;
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("frontend");

  const categories: { value: SkillCategory; label: string }[] = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "mobile", label: "Mobile" },
    { value: "tools", label: "Tools & Others" },
  ];

  const skills: Skill[] = [
    // Frontend
    { name: "React.js", icon: "⚛️", proficiency: 95, category: "frontend" },
    { name: "Next.js", icon: "⚡", proficiency: 90, category: "frontend" },
    { name: "TypeScript", icon: "📘", proficiency: 88, category: "frontend" },
    { name: "JavaScript", icon: "💛", proficiency: 95, category: "frontend" },
    { name: "HTML/CSS", icon: "🎨", proficiency: 92, category: "frontend" },
    { name: "Redux", icon: "🔄", proficiency: 85, category: "frontend" },
    
    // Backend
    { name: "Spring Boot", icon: "🍃", proficiency: 85, category: "backend" },
    { name: "Express.js", icon: "🚂", proficiency: 92, category: "backend" },
    { name: "Node.js", icon: "💚", proficiency: 90, category: "backend" },
    { name: "Django", icon: "🐍", proficiency: 82, category: "backend" },
    { name: "MongoDB", icon: "🍃", proficiency: 88, category: "backend" },
    { name: "PostgreSQL", icon: "🐘", proficiency: 85, category: "backend" },
    
    // Mobile
    { name: "Flutter", icon: "💙", proficiency: 90, category: "mobile" },
    { name: "Dart", icon: "🎯", proficiency: 88, category: "mobile" },
    { name: "React Native", icon: "📱", proficiency: 80, category: "mobile" },
    { name: "Mobile UI/UX", icon: "📐", proficiency: 85, category: "mobile" },
    
    // Tools & Others
    { name: "Git & GitHub", icon: "🐙", proficiency: 92, category: "tools" },
    { name: "Docker", icon: "🐳", proficiency: 82, category: "tools" },
    { name: "AWS", icon: "☁️", proficiency: 78, category: "tools" },
    { name: "CI/CD", icon: "🔄", proficiency: 80, category: "tools" },
    { name: "RESTful APIs", icon: "🔌", proficiency: 90, category: "tools" },
    { name: "GraphQL", icon: "📊", proficiency: 75, category: "tools" },
  ];

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="section-container">
        <AnimatedSection>
          <h2 className="section-title">My Skills</h2>
          <p className="section-subtitle">
            I've acquired a diverse set of skills throughout my journey as a full-stack developer.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category.value
                    ? "bg-accent text-white"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <AnimatedSection key={skill.name} delay={index * 100} animation="scale-in">
              <div className="glass-card rounded-lg p-6 hover-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {skill.icon}
                    </span>
                    <h3 className="font-display font-semibold">{skill.name}</h3>
                  </div>
                  <span className="text-sm font-medium text-accent">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-accent h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
