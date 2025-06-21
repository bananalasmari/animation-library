import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Masonry from "./components/Masonry";
import ChromaGrid from "./components/ChromaGrid";
import CircularGallery from "./components/CircularGallery";
import ArabicCardSwap from './components/ArabicCardSwap'

const ScrollAnimation = ({ children, className = "", variants }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const defaultVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants || defaultVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimationLibrary = () => {
  const animations = [
    {
      title: "زوم وتوهج",
      variants: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          filter: "drop-shadow(0 0 15px #0ff)",
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "سلايد من اليمين",
      variants: {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
      },
    },
    {
      title: "سلايد من اليسار وتوهج",
      variants: {
        hidden: { opacity: 0, x: -100 },
        visible: {
          opacity: 1,
          x: 0,
          filter: "drop-shadow(0 0 10px #00ffff)",
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "تدوير وتلاشي",
      variants: {
        hidden: { opacity: 0, rotate: -15 },
        visible: {
          opacity: 1,
          rotate: 0,
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "اهتزاز خفيف",
      variants: {
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: [0, -5, 5, -5, 5, 0],
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "زوم تدريجي للأيقونة",
      variants: {
        hidden: { opacity: 0, scale: 0.6 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 1.2 },
        },
      },
    },
    {
      title: "سلايد من الأسفل مع توهج",
      variants: {
        hidden: { opacity: 0, y: 100 },
        visible: {
          opacity: 1,
          y: 0,
          boxShadow: "0 0 20px #0ff",
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "توهج نابض",
      variants: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: [0.95, 1.05, 1],
          boxShadow: "0 0 30px #0ff",
          transition: { duration: 1.2 },
        },
      },
    },
    {
      title: "انزلاق مع تلاشي",
      variants: {
        hidden: { opacity: 0, x: -50, y: 50 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "سلايد من الأعلى وتدوير",
      variants: {
        hidden: { opacity: 0, y: -100, rotate: -10 },
        visible: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "رفع تدريجي",
      variants: {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "سقوط خفيف وظهور",
      variants: {
        hidden: { opacity: 0, y: -30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.2 },
        },
      },
    },
    {
      title: "تدوير ثلاثي الاتجاهات",
      variants: {
        hidden: { opacity: 0, rotate: -90 },
        visible: {
          opacity: 1,
          rotate: 0,
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "اهتزاز أفقي مستمر",
      variants: {
        hidden: { opacity: 0, x: -20 },
        visible: {
          opacity: 1,
          x: [0, -10, 10, -10, 10, 0],
          transition: { duration: 1.4 },
        },
      },
    },
    {
      title: "انكماش ثم توسع",
      variants: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
          opacity: 1,
          scale: [0.5, 1.2, 1],
          transition: { duration: 1.3 },
        },
      },
    },
    {
      title: "زوم على صورة",
      variants: {
        hidden: { opacity: 0, scale: 1.2 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 1.1 },
        },
      },
    },
    {
      title: "سلايد صورة من اليمين",
      variants: {
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 1.1 },
        },
      },
    },
    {
      title: "توهج على صورة",
      variants: {
        hidden: { opacity: 0, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          filter: "blur(0)",
          transition: { duration: 1 },
        },
      },
    },
    {
      title: "نبض ضوئي على صورة",
      variants: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: [0.95, 1.05, 1],
          transition: { duration: 1.3 },
        },
      },
    },
  ];

  const icons = [
    "✨",
    "➡️",
    "⬅️",
    "🔄",
    "💥",
    "🔍",
    "⬇️",
    "⚡",
    "🌀",
    "🔁",
    "📈",
    "📉",
    "🎯",
    "🔊",
    "🔔",
    "📸",
    "🖼️",
    "🌠",
    "💡",
  ];

  return (
    <div className="min-h-screen text-white px-4 py-10">
 <div className="max-w-screen-2xl mx-auto flex flex-col space-y-24">
  {/* القسم الأول */}
  <div className="w-full order-1">
    <ChromaGrid />
  </div>
  
  {/* القسم الثاني */}
  <div className="w-full order-3 md:order-2">
    <Masonry />
  </div>
  
  {/* القسم الثالث */}
  <div className="w-full order-2 md:order-3">
    <CircularGallery />
  </div>

   {/* القسم الثالث */}
   <div className="w-full order-2 md:order-3">
   <ArabicCardSwap/>
  </div>

</div>
  </div>
  );
};

export default AnimationLibrary;
