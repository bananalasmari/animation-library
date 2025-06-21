import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

const AnimationLibraryText = () => {
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
    <div className="min-h-screen text-white p-4 md:p-6 lg:p-10">
      <div className="max-w-screen-2xl mx-auto space-y-24">
        <div className="space-y-12 sm:space-y-16 px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              مكتبة{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                النصوص
              </span>
            </h1>
          </div>
          {animations.map((anim, i) => (
            <ScrollAnimation key={i} variants={anim.variants}>
              <div className="bg-gray-800 rounded-xl p-4 sm:p-6 text-center shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4">
                  {anim.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                  هذا مثال لتأثير: {anim.title}
                </p>
                {i >= 15 ? (
                  <img
                    src={`https://loremflickr.com/400/250/city?lock=${i}`}
                    alt={`مثال ${i}`}
                    className="rounded-lg mx-auto shadow-xl w-full max-w-sm"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center text-3xl sm:text-4xl bg-cyan-900/40 text-cyan-300 rounded-full shadow-inner">
                    {icons[i % icons.length]}
                  </div>
                )}
              </div>
            </ScrollAnimation>
          ))}

          <ScrollAnimation>
            <div className="bg-gray-800 rounded-xl p-4 sm:p-6 text-center mt-12 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4">
                طريقة الاستخدام
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-2">
                استخدم{" "}
                <code className="text-green-400">&lt;ScrollAnimation&gt;</code>{" "}
                مع تحديد variants لتطبيق أي تأثير تحبه.
              </p>
              <code className="block bg-black text-green-400 text-xs sm:text-sm rounded p-4 mt-4 overflow-auto">
                {`<ScrollAnimation variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
  <div>عنصر يظهر بتأثير مخصص</div>
</ScrollAnimation>`}
              </code>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default AnimationLibraryText;
