
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, ChevronLeft, X, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "@/hooks/use-theme";

// Tour steps with content for each section
const tourSteps = [
  {
    id: "welcome",
    target: "#home",
    content: "Hi there! I'm Yigo, your digital assistant. Let me show you around Yigermal's portfolio!",
    position: "center",
  },
  {
    id: "about",
    target: "#about",
    content: "Here you can learn more about Yigermal's background, expertise, and professional journey.",
    position: "right",
  },
  {
    id: "skills",
    target: "#skills",
    content: "These are the technologies and tools Yigermal is proficient in. Quite impressive, right?",
    position: "left",
  },
  {
    id: "story",
    target: "#story",
    content: "This timeline shows Yigermal's development process from concept to completion.",
    position: "right",
  },
  {
    id: "projects",
    target: "#projects",
    content: "Check out these amazing projects Yigermal has worked on. Each one demonstrates different skills.",
    position: "left",
  },
  {
    id: "contact",
    target: "#contact",
    content: "Want to work with Yigermal? Reach out through this contact form. I'll make sure he gets your message!",
    position: "right",
  },
  {
    id: "final",
    target: "#home",
    content: "Thanks for taking the tour! Feel free to explore the portfolio in more detail now.",
    position: "center",
  },
];

export const TourGuide = () => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const { theme } = useTheme();
  
  // Auto-scroll to the target element
  useEffect(() => {
    if (isTourActive && tourSteps[currentStep]) {
      const targetElement = document.querySelector(tourSteps[currentStep].target);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentStep, isTourActive]);

  // Show welcome toast when component mounts
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("has-seen-tour");
    if (!hasSeenTour) {
      setTimeout(() => {
        toast("👋 Hi there! Want a tour of this portfolio?", {
          action: {
            label: "Start Tour",
            onClick: () => startTour(),
          },
          duration: 8000,
        });
      }, 3000);
    }
  }, []);

  const startTour = () => {
    setIsTourActive(true);
    setCurrentStep(0);
    setIsMinimized(false);
    localStorage.setItem("has-seen-tour", "true");
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isTourActive) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button 
          onClick={startTour} 
          className="rounded-full shadow-lg flex items-center gap-2 bg-accent hover:bg-accent/90"
        >
          <PlayCircle size={18} />
          Start Tour
        </Button>
      </motion.div>
    );
  }

  const currentTourStep = tourSteps[currentStep];
  const characterPosition = currentTourStep.position || "right";

  // Character styles based on position
  const getCharacterStyle = () => {
    if (isMinimized) {
      return "fixed bottom-8 right-8 cursor-pointer z-50";
    }
    
    switch (characterPosition) {
      case "left":
        return "fixed bottom-32 left-8 z-50";
      case "right":
        return "fixed bottom-32 right-8 z-50";
      case "center":
      default:
        return "fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50";
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`max-w-sm mx-auto ${getCharacterStyle()} select-none`}
          >
            <div className={`glass-card rounded-xl overflow-hidden shadow-lg border border-accent/20 ${characterPosition === "center" ? "w-80" : "w-72"}`}>
              {/* Character Image */}
              <div className="relative">
                <div className="h-24 overflow-hidden bg-gradient-to-r from-accent/40 to-accent/10">
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 rounded-full bg-background border-4 border-accent overflow-hidden">
                      <img 
                        src={theme === "dark" ? "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=1e293b" : "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"} 
                        alt="Tour Guide" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tour Content */}
              <div className="p-4 pt-12 text-center">
                <h3 className="font-display text-lg font-bold mb-2">Yigo</h3>
                <p className="text-sm text-muted-foreground mb-4">{currentTourStep.content}</p>
                
                {/* Tour Controls */}
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={prevStep} 
                    disabled={currentStep === 0}
                    className="text-xs flex gap-1"
                  >
                    <ChevronLeft size={14} />
                    Prev
                  </Button>
                  
                  <span className="text-xs text-muted-foreground">
                    {currentStep + 1}/{tourSteps.length}
                  </span>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={nextStep}
                    className="text-xs flex gap-1"
                  >
                    {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
                    <ChevronRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Minimize Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-background border border-border shadow-md hover:bg-secondary"
              onClick={toggleMinimize}
            >
              <X size={14} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Minimized State */}
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 z-50 cursor-pointer"
          onClick={toggleMinimize}
        >
          <div className="w-14 h-14 rounded-full bg-accent/90 border-4 border-background shadow-lg flex items-center justify-center">
            <img 
              src={theme === "dark" ? "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix&backgroundColor=1e293b" : "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"} 
              alt="Tour Guide" 
              className="w-full h-full rounded-full"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default TourGuide;
