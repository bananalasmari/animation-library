import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  // بيانات تجريبية سعودية مع أيقونات
  const demo = [
    {
      icon: "💻",
      title: "أحمد الصالح",
      subtitle: "مطور تطبيقات",
      handle: "@ahmed_saleh",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg,#4F46E5,#1a1a2e)",
      url: "https://github.com/",
    },
    {
      icon: "🎨",
      title: "فاطمة النور",
      subtitle: "مصممة واجهات",
      handle: "@fatima_noor",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg,#10B981,#0f3460)",
      url: "https://linkedin.com/in/",
    },
    {
      icon: "⚙️",
      title: "محمد العلي",
      subtitle: "مهندس برمجيات",
      handle: "@mohammed_ali",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg,#F59E0B,#2d1b00)",
      url: "https://dribbble.com/",
    },
    {
      icon: "📊",
      title: "سارة الزهراني",
      subtitle: "عالمة بيانات",
      handle: "@sara_zahrani",
      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg,#EF4444,#3d0000)",
      url: "https://kaggle.com/",
    },
    {
      icon: "📱",
      title: "عبدالله الفهد",
      subtitle: "مطور تطبيقات موبايل",
      handle: "@abdullah_fahd",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg,#8B5CF6,#2e1065)",
      url: "https://github.com/",
    },
    {
      icon: "🔒",
      title: "نور الهدى",
      subtitle: "خبيرة أمن سيبراني",
      handle: "@noor_huda",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(135deg,#06B6D4,#0c4a6e)",
      url: "https://aws.amazon.com/",
    },
    {
      icon: "🤖",
      title: "خالد المطيري",
      subtitle: "مهندس ذكاء اصطناعي",
      handle: "@khalid_mutairi",
      borderColor: "#EC4899",
      gradient: "linear-gradient(180deg,#EC4899,#831843)",
      url: "https://github.com/",
    },
    {
      icon: "🌐",
      title: "رنا الشمري",
      subtitle: "مطورة ويب",
      handle: "@rana_shamri",
      borderColor: "#84CC16",
      gradient: "linear-gradient(270deg,#84CC16,#365314)",
      url: "https://portfolio.com/",
    },
    {
      icon: "☁️",
      title: "سلطان الدوسري",
      subtitle: "مهندس الحوسبة السحابية",
      handle: "@sultan_dosari",
      borderColor: "#F97316",
      gradient: "linear-gradient(315deg,#F97316,#431407)",
      url: "https://aws.amazon.com/",
    },
    {
      icon: "📋",
      title: "هند القحطاني",
      subtitle: "مديرة المنتجات الرقمية",
      handle: "@hind_qahtani",
      borderColor: "#14B8A6",
      gradient: "linear-gradient(225deg,#14B8A6,#134e4a)",
      url: "https://linkedin.com/in/",
    },
    {
      icon: "⛓️",
      title: "بندر السبيعي",
      subtitle: "خبير البلوك تشين",
      handle: "@bandar_subai",
      borderColor: "#A855F7",
      gradient: "linear-gradient(135deg,#A855F7,#581c87)",
      url: "https://github.com/",
    },
    {
      icon: "🧠",
      title: "ريم العتيبي",
      subtitle: "مطورة الذكاء الاصطناعي",
      handle: "@reem_otaibi",
      borderColor: "#DC2626",
      gradient: "linear-gradient(180deg,#DC2626,#7f1d1d)",
      url: "https://tensorflow.org/",
    },
  ];

  const data = items?.length ? items : demo;

  const handleMove = (e) => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  const handleCardClick = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className=" bg-gray-900 p-8" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          فريق <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">المطورين</span>
        </h1>
        <p className="text-xl text-gray-300">تعرف على خبرائنا في التكنولوجيا</p>
      </div>

      <div
        ref={rootRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`relative w-full flex flex-wrap justify-center items-start gap-6 p-4 ${className}`}
        style={{
          minHeight: "600px",
        }}
      >
        {data.map((person, index) => (
          <motion.article
            key={index}
            onClick={() => handleCardClick(person.url)}
            className="group relative flex flex-col w-[280px] h-[380px] rounded-2xl overflow-hidden border-2 border-transparent cursor-pointer transform-gpu"
            style={{
              background: person.gradient,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              borderColor: person.borderColor,
              transition: { duration: 0.3 }
            }}
          >
            {/* تأثير الإضاءة عند الهوفر */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 70%)`,
                }}
              />
            </div>

            {/* الأيقونة */}
            <div className="relative z-10 flex-1 p-4 flex items-center justify-center">
              <div 
                className="w-36 h-36 rounded-full flex items-center justify-center text-7xl shadow-2xl transform group-hover:scale-110 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${person.borderColor}15, ${person.borderColor}35)`,
                  border: `4px solid ${person.borderColor}`,
                  backdropFilter: "blur(15px)",
                  boxShadow: `0 20px 40px ${person.borderColor}20`,
                }}
              >
                <span className="filter drop-shadow-lg">
                  {person.icon}
                </span>
              </div>
            </div>

            {/* معلومات الشخص */}
            <footer className="relative z-10 p-4 text-white">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{person.title}</h3>
                  <p className="text-sm opacity-80">{person.subtitle}</p>
                </div>
                {person.handle && (
                  <span className="text-xs opacity-60 bg-white/10 px-2 py-1 rounded-full">
                    {person.handle}
                  </span>
                )}
              </div>

              {/* خط فاصل بلون الحدود */}
              <div 
                className="w-full h-0.5 rounded-full mb-2"
                style={{ backgroundColor: person.borderColor }}
              />

              {/* أيقونات التواصل الاجتماعي */}
              <div className="flex justify-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-xs">🔗</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-xs">💼</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-xs">📧</span>
                </div>
              </div>
            </footer>
          </motion.article>
        ))}

        {/* تأثير الكروما - الطبقة المظلمة */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: "rgba(0,0,0,0.001)",
            backdropFilter: "grayscale(1) brightness(0.7)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.7)",
            maskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, transparent 15%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 75%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, transparent 15%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 75%, black 100%)`,
          }}
          animate={{
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* تأثير الكروما - الطبقة المضيئة */}
        <motion.div
          ref={fadeRef}
          className="absolute inset-0 pointer-events-none z-40"
          style={{
            background: "rgba(0,0,0,0.001)",
            backdropFilter: "grayscale(1) brightness(0.7)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.7)",
            maskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}% ${mousePos.y}%, white 0%, white 15%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 75%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}% ${mousePos.y}%, white 0%, white 15%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 75%, transparent 100%)`,
          }}
          animate={{
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: fadeOut }}
        />
      </div>

      {/* تعليمات للمستخدم */}
      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          حرك الماوس فوق الشبكة لرؤية تأثير الكروما التفاعلي
        </p>
      </div>
    </div>
  );
};

export default ChromaGrid;