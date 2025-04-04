import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Pure React/CSS implementation without Three.js
const CloudyBackground: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  
  // Colors for different times of day
  const bgColors = {
    day: "bg-gradient-to-b from-sky-400 to-sky-200",
    sunset: "bg-gradient-to-b from-orange-300 via-pink-300 to-purple-400",
    night: "bg-gradient-to-b from-indigo-900 via-blue-900 to-blue-800"
  };
  
  // Change time of day on click
  const cycleTimeOfDay = () => {
    setTimeOfDay(current => {
      if (current === 'day') return 'sunset';
      if (current === 'sunset') return 'night';
      return 'day';
    });
  };
  
  // Define cloud styles based on time of day
  const cloudOpacity = timeOfDay === 'night' ? 0.3 : 0.8;
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full z-0 overflow-hidden ${bgColors[timeOfDay]} transition-colors duration-1000`}
      onClick={cycleTimeOfDay}
    >
      {/* Stars only visible at night */}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Sun or Moon */}
      <motion.div 
        className={`absolute rounded-full ${
          timeOfDay === 'day' 
            ? 'bg-yellow-300' 
            : timeOfDay === 'sunset' 
              ? 'bg-orange-500' 
              : 'bg-gray-200'
        }`}
        style={{ 
          width: timeOfDay === 'night' ? '40px' : '80px',
          height: timeOfDay === 'night' ? '40px' : '80px',
          boxShadow: timeOfDay === 'night' 
            ? '0 0 20px rgba(255, 255, 255, 0.5)' 
            : '0 0 60px rgba(255, 255, 0, 0.5)'
        }}
        animate={{ 
          top: timeOfDay === 'day' 
            ? ['10%', '8%', '10%'] 
            : timeOfDay === 'sunset' 
              ? ['70%', '68%', '70%'] 
              : ['20%', '18%', '20%'],
          left: ['60%', '60.5%', '60%'],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Clouds */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Cloud 1 */}
        <motion.div 
          className="absolute"
          animate={{ x: [0, window.innerWidth, 0] }}
          transition={{ 
            duration: 120, 
            repeat: Infinity, 
            ease: "linear"
          }}
          style={{ top: '15%' }}
        >
          <div 
            className="bg-white rounded-full w-20 h-16"
            style={{ opacity: cloudOpacity, filter: 'blur(4px)' }}
          />
        </motion.div>
        
        {/* Cloud 2 */}
        <motion.div 
          className="absolute"
          animate={{ x: [window.innerWidth * 0.3, -200, window.innerWidth * 0.3] }}
          transition={{ 
            duration: 90, 
            repeat: Infinity, 
            ease: "linear"
          }}
          style={{ top: '10%' }}
        >
          <div 
            className="bg-white rounded-full w-32 h-16"
            style={{ opacity: cloudOpacity, filter: 'blur(5px)' }}
          />
        </motion.div>
        
        {/* Cloud 3 */}
        <motion.div 
          className="absolute"
          animate={{ x: [window.innerWidth * 0.7, -300, window.innerWidth * 0.7] }}
          transition={{ 
            duration: 100, 
            repeat: Infinity, 
            ease: "linear"
          }}
          style={{ top: '25%' }}
        >
          <div 
            className="bg-white rounded-full w-40 h-24"
            style={{ opacity: cloudOpacity, filter: 'blur(6px)' }}
          />
        </motion.div>
        
        {/* Cloud 4 */}
        <motion.div 
          className="absolute"
          animate={{ x: [-150, window.innerWidth, -150] }}
          transition={{ 
            duration: 110, 
            repeat: Infinity, 
            ease: "linear"
          }}
          style={{ top: '35%' }}
        >
          <div 
            className="bg-white rounded-full w-28 h-14"
            style={{ opacity: cloudOpacity, filter: 'blur(3px)' }}
          />
        </motion.div>
        
        {/* Cloud 5 */}
        <motion.div 
          className="absolute"
          animate={{ x: [window.innerWidth * 0.5, -250, window.innerWidth * 0.5] }}
          transition={{ 
            duration: 95, 
            repeat: Infinity, 
            ease: "linear"
          }}
          style={{ top: '45%' }}
        >
          <div 
            className="bg-white rounded-full w-36 h-20"
            style={{ opacity: cloudOpacity, filter: 'blur(5px)' }}
          />
        </motion.div>
      </div>
      
      {/* Display instructions */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-30 text-white px-3 py-1 rounded-lg text-sm">
        Click to change time of day
      </div>
    </div>
  );
};

export default CloudyBackground; 