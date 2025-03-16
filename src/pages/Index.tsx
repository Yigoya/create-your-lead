
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedCursor from "@/components/AnimatedCursor";
import ScrollProgress from "@/components/ScrollProgress";
import StorySection from "@/components/StorySection";
import TourGuide from "@/components/TourGuide";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnimatedCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <StorySection />
      <Projects />
      <Contact />
      <Footer />
      <TourGuide />
    </div>
  );
};

export default Index;
