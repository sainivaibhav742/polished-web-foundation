import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`preloader ${!isLoading ? 'fade-out' : ''}`}>
      <div className="flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="text-4xl font-serif font-bold text-primary animate-pulse">
            ProCorp
          </div>
          <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        {/* Loading Animation */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-muted-foreground text-sm">
          Loading Excellence...
        </p>
      </div>
    </div>
  );
};

export default Preloader;