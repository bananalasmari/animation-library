import React from 'react';

const BeamsBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 w-1 h-[200%] bg-gradient-to-b from-purple-500 via-pink-500 to-transparent opacity-20 blur-sm mix-blend-screen rotate-45 animate-beam"
          style={{
            left: `${i * 5}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        />
      ))}

      <style>{`
        @keyframes beam {
          0% {
            transform: translateY(-100%) rotate(45deg);
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(100%) rotate(45deg);
            opacity: 0.05;
          }
        }
        .animate-beam {
          animation-name: beam;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default BeamsBackground;