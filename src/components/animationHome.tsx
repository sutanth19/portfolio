import React, { useEffect, useState } from 'react';

interface Character {
  id: number;
  char: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  direction: number;
  animationType: 'float' | 'drift';
  zone: 'top' | 'right' | 'minimal-left';
  glowIntensity: number;
}

const AnimationHome = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Character sets optimized for better visual balance
  const singleChars = ['{', '}', '<', '/', '>', '0', '1', ':', ';', '=', '"', '(', ')', '[', ']', '.', ',', '+', '-', '*', '&&', '||'];
  const codeWords = ['jsx', 'ts', 'tsx', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'true', 'false', 'React', 'Next.js', 'JS', 'CSS', 'HTML', 'API', 'JSON'];
  
  const getCharacterForZone = (zone: Character['zone'], size: number): string => {
    if (size < 0.35) {
      return singleChars[Math.floor(Math.random() * singleChars.length)];
    }
    
    const wordChance = {
      'minimal-left': 0.3,
      'top': 0.5,
      'right': 0.6
    }[zone];
    
    return Math.random() > wordChance 
      ? codeWords[Math.floor(Math.random() * codeWords.length)]
      : singleChars[Math.floor(Math.random() * singleChars.length)];
  };

  const createZoneCharacters = (startId: number, count: number, zone: Character['zone']) => {
    const zoneConfig = {
      top: {
        xRange: [0, 95],
        yRange: [0, 25],
        sizeRange: [0.3, 0.8],
        durationRange: [15, 30],
        delayRange: [0, 8],
        glowRange: [0.1, 0.4]
      },
      right: {
        xRange: [50, 95],
        yRange: [25, 100],
        sizeRange: [0.4, 0.9],
        durationRange: [20, 35],
        delayRange: [0, 12],
        glowRange: [0.2, 0.5]
      },
      'minimal-left': {
        xRange: [0, 15],
        yRange: [60, 95],
        sizeRange: [0.2, 0.35],
        durationRange: [30, 45],
        delayRange: [0, 20],
        glowRange: [0.03, 0.1]
      }
    };

    const config = zoneConfig[zone];
    const newCharacters: Character[] = [];

    for (let i = 0; i < count; i++) {
      const size = Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0];
      const char = getCharacterForZone(zone, size);
      const isWord = char.length > 2;
      
      // Adjust positioning for words to prevent overflow
      const xAdjustment = isWord ? 10 : 0;
      const maxX = config.xRange[1] - xAdjustment;
      
      newCharacters.push({
        id: startId + i,
        char,
        x: Math.random() * (maxX - config.xRange[0]) + config.xRange[0],
        y: Math.random() * (config.yRange[1] - config.yRange[0]) + config.yRange[0],
        size: isWord ? Math.min(size, config.sizeRange[1] * 0.8) : size,
        duration: Math.random() * (config.durationRange[1] - config.durationRange[0]) + config.durationRange[0],
        delay: Math.random() * (config.delayRange[1] - config.delayRange[0]) + config.delayRange[0],
        direction: Math.random() > 0.5 ? 1 : -1,
        animationType: Math.random() > 0.4 ? 'float' : 'drift',
        zone,
        glowIntensity: Math.random() * (config.glowRange[1] - config.glowRange[0]) + config.glowRange[0]
      });
    }
    
    return newCharacters;
  };

  useEffect(() => {
    const generateCharacters = () => {
      const newCharacters = [
        ...createZoneCharacters(0, 30, 'top'),
        ...createZoneCharacters(30, 25, 'right'),
        ...createZoneCharacters(55, 4, 'minimal-left')
      ];
      
      setCharacters(newCharacters);
    };

    generateCharacters();
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getCharacterStyles = (char: Character) => {
    const isWord = char.char.length > 2;
    
    return {
      left: `${char.x}%`,
      top: `${char.y}%`,
      fontSize: `${char.size}rem`,
      animationDuration: `${char.duration}s`,
      animationDelay: `${char.delay}s`,
      textShadow: `0 0 ${char.glowIntensity * 15}px rgba(34, 197, 94, ${char.glowIntensity})`,
      filter: `blur(${char.zone === 'minimal-left' ? '0.5px' : '0.2px'})`,
      whiteSpace: 'nowrap' as const,
      zIndex: isWord ? 2 : 1,
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden' as const,
      transform: 'translateZ(0)'
    };
  };

  const getOpacityClass = (zone: Character['zone']) => {
    switch (zone) {
      case 'top': return 'opacity-20 hover:opacity-40';
      case 'right': return 'opacity-25 hover:opacity-50';
      case 'minimal-left': return 'opacity-10 hover:opacity-20';
      default: return 'opacity-15 hover:opacity-30';
    }
  };

  const getAnimationClass = (char: Character) => {
    const baseClass = char.animationType === 'float' ? 'animate-float' : 'animate-drift';
    return `${baseClass} animate-pulse-glow`;
  };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) translateZ(0); 
          }
          25% { 
            transform: translateY(-8px) rotate(1deg) translateZ(0); 
          }
          50% { 
            transform: translateY(-15px) rotate(2deg) translateZ(0); 
          }
          75% { 
            transform: translateY(-8px) rotate(1deg) translateZ(0); 
          }
        }
        
        @keyframes drift {
          0% { 
            transform: translateX(-8px) rotate(0deg) translateZ(0); 
            opacity: 0.3; 
          }
          25% { 
            transform: translateX(2px) rotate(2deg) translateZ(0); 
            opacity: 0.7; 
          }
          50% { 
            transform: translateX(8px) rotate(4deg) translateZ(0); 
            opacity: 0.9; 
          }
          75% { 
            transform: translateX(2px) rotate(2deg) translateZ(0); 
            opacity: 0.7; 
          }
          100% { 
            transform: translateX(-8px) rotate(0deg) translateZ(0); 
            opacity: 0.3; 
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            filter: brightness(1) drop-shadow(0 0 3px rgba(34, 197, 94, 0.3)); 
          }
          50% { 
            filter: brightness(1.1) drop-shadow(0 0 6px rgba(34, 197, 94, 0.5)); 
          }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-drift {
          animation: drift 25s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 8s ease-in-out infinite;
        }
        
        .animate-grid-move {
          animation: grid-move 40s linear infinite;
        }
        
        .character-element {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .character-element:hover {
          animation-play-state: paused;
          transform: scale(1.05) !important;
        }
      `}</style>
      
      {characters.map((char) => (
        <div
          key={char.id}
          className={`
            absolute text-green-400 font-mono font-medium select-none 
            character-element cursor-pointer
            ${getOpacityClass(char.zone)}
            ${getAnimationClass(char)}
            ${char.char.length > 2 ? 'font-semibold tracking-wide' : ''}
          `}
          style={getCharacterStyles(char)}
        >
          {char.char}
        </div>
      ))}
      
      {/* Optimized grid overlay */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Top grid */}
        <div className="absolute top-0 left-0 w-full h-1/4 opacity-5">
          <div 
            className="h-full w-full animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        
        {/* Right grid */}
        <div className="absolute top-1/4 right-0 w-1/2 h-3/4 opacity-4">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px),
                linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '35px 35px',
              animation: 'grid-move 45s linear infinite reverse'
            }}
          />
        </div>
        
        {/* Left minimal grid */}
        <div className="absolute top-1/4 left-0 w-1/2 h-3/4 opacity-2">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(34, 197, 94, 0.04) 1px, transparent 1px),
                linear-gradient(rgba(34, 197, 94, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'grid-move 50s linear infinite'
            }}
          />
        </div>
      </div>
      
      {/* Subtle depth gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/3 pointer-events-none transition-opacity duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default AnimationHome;