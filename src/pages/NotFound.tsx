
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-pattern">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/80 z-0"></div>
      <div className="glass-card rounded-xl p-10 text-center max-w-md relative z-10">
        <h1 className="font-display text-5xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This page appears to have wandered off.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center h-12 px-6 font-medium text-primary-foreground transition-all rounded-md bg-accent hover:bg-accent/90 focus-ring"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
