
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

type ProjectCategory = "all" | "web" | "mobile" | "fullstack";

interface Project {
  title: string;
  description: string;
  category: ProjectCategory[];
  technologies: string[];
  image: string; // Placeholder - would use actual images in production
  links: {
    live?: string;
    github?: string;
  };
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const categories: { value: ProjectCategory; label: string }[] = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web" },
    { value: "mobile", label: "Mobile" },
    { value: "fullstack", label: "Full Stack" },
  ];

  const projects: Project[] = [
    {
      title: "Social Media Application",
      description:
        "A comprehensive social media platform with real-time messaging, post sharing, and user profiles.",
      category: ["mobile", "fullstack"],
      technologies: ["Flutter", "Express", "MongoDB", "Socket.io"],
      image: "https://placehold.co/600x400/222/fff?text=Social+Media+App",
      links: {
        github: "#",
      },
    },
    {
      title: "Broker Transaction Management Dashboard",
      description:
        "A powerful dashboard for brokers to manage transactions, track deals, and visualize business metrics.",
      category: ["web", "fullstack"],
      technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
      image: "https://placehold.co/600x400/222/fff?text=Transaction+Dashboard",
      links: {
        live: "#",
        github: "#",
      },
    },
    {
      title: "Islamic Dating Application",
      description:
        "A culturally-sensitive dating app designed with respect for Islamic traditions, featuring profile matching and messaging.",
      category: ["mobile", "fullstack"],
      technologies: ["Flutter", "Node.js", "MongoDB", "Firebase"],
      image: "https://placehold.co/600x400/222/fff?text=Dating+App",
      links: {
        github: "#",
      },
    },
    {
      title: "Customer-Business Connection Platform",
      description:
        "A comprehensive platform connecting customers with businesses, featuring service discovery, booking, and reviews.",
      category: ["web", "mobile", "fullstack"],
      technologies: ["React", "Flutter", "Spring Boot", "PostgreSQL"],
      image: "https://placehold.co/600x400/222/fff?text=Connection+Platform",
      links: {
        live: "#",
        github: "#",
      },
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category.includes(activeCategory));

  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30">
      <div className="section-container">
        <AnimatedSection>
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">
            Here are some of the projects I've worked on. Each showcases different skills and technologies.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedSection
              key={project.title}
              delay={index * 150}
              animation={index % 2 === 0 ? "fade-in-right" : "fade-in-left"}
              className="flex flex-col h-full"
            >
              <div className="glass-card rounded-xl overflow-hidden flex flex-col h-full hover-card">
                <div className="aspect-video bg-accent/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-medium py-1 px-2 rounded-full bg-black/20 backdrop-blur-sm text-white"
                      >
                        {cat === "web" ? "Web" : cat === "mobile" ? "Mobile" : "Full Stack"}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-display text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs py-1 px-2 rounded-full bg-secondary text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-foreground border border-input rounded-md hover:bg-secondary transition-colors focus-ring"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    )}
                    
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-primary-foreground bg-accent rounded-md hover:bg-accent/90 transition-colors focus-ring"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
