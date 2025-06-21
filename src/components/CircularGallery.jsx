import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CircularGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const containerRef = useRef(null);

  // بيانات المعرض العربي
  const galleryItems = [
    {
      id: 1,
      title: "تطوير التطبيقات",
      subtitle: "حلول تقنية متقدمة",
      icon: "💻",
      color: "#4F46E5",
      gradient: "linear-gradient(135deg, #4F46E5, #7C3AED)",
      description: "نطور تطبيقات حديثة وفعالة باستخدام أحدث التقنيات"
    },
    {
      id: 2,
      title: "تصميم الواجهات",
      subtitle: "تجربة مستخدم مميزة",
      icon: "🎨",
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981, #059669)",
      description: "نصمم واجهات جذابة وسهلة الاستخدام لجميع المنصات"
    },
    {
      id: 3,
      title: "الذكاء الاصطناعي",
      subtitle: "مستقبل التكنولوجيا",
      icon: "🤖",
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      description: "نستخدم تقنيات الذكاء الاصطناعي لحل المشاكل المعقدة"
    },
    {
      id: 4,
      title: "الأمن السيبراني",
      subtitle: "حماية شاملة",
      icon: "🔒",
      color: "#EF4444",
      gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
      description: "نؤمن أعلى مستويات الحماية لبياناتك ومعلوماتك"
    },
    {
      id: 5,
      title: "تحليل البيانات",
      subtitle: "رؤى ذكية للأعمال",
      icon: "📊",
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
      description: "نحول البيانات إلى معلومات قيمة لاتخاذ قرارات أفضل"
    },
    {
      id: 6,
      title: "الحوسبة السحابية",
      subtitle: "مرونة وقابلية التوسع",
      icon: "☁️",
      color: "#06B6D4",
      gradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
      description: "نقدم حلول سحابية مرنة وآمنة لجميع احتياجاتك"
    }
  ];

  const totalItems = galleryItems.length;
  const centerX = 50;
  const centerY = 50;
  const radius = 35;

  // حساب موقع كل عنصر في الدائرة
  const getItemPosition = (index, activeIndex) => {
    const angle = ((index - activeIndex) * (360 / totalItems)) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle - Math.PI / 2);
    const y = centerY + radius * Math.sin(angle - Math.PI / 2);
    const scale = index === activeIndex ? 1.2 : 0.8;
    const zIndex = index === activeIndex ? 10 : 1;
    const opacity = index === activeIndex ? 1 : 0.6;
    
    return { x, y, scale, zIndex, opacity };
  };

  // التشغيل التلقائي
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, totalItems]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    setIsAutoPlay(false);
    
    // إعادة تشغيل التشغيل التلقائي بعد 5 ثوانِ
    setTimeout(() => setIsAutoPlay(true), 5000);
  };

  const activeItem = galleryItems[activeIndex];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="max-w-7xl w-full">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2 sm:mb-4">
            خدماتنا <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">التقنية</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 px-4">اكتشف ما نقدمه من حلول تقنية متطورة</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          {/* المعرض الدائري - متجاوب */}
          <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] aspect-square mx-auto lg:mx-0">
            <div 
              ref={containerRef}
              className="relative w-full h-full"
              style={{ perspective: "1000px" }}
            >
              {galleryItems.map((item, index) => {
                const position = getItemPosition(index, activeIndex);
                const isActive = index === activeIndex;
                
                return (
                  <motion.div
                    key={item.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      zIndex: position.zIndex,
                      width: "clamp(3rem, 8vw, 5rem)", // متجاوب: 48px-80px
                      height: "clamp(3rem, 8vw, 5rem)",
                    }}
                    animate={{
                      scale: position.scale,
                      opacity: position.opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={() => handleItemClick(index)}
                    whileHover={{
                      scale: isActive ? 1.3 : 1.0,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center shadow-2xl border-2 sm:border-4 border-white/20"
                      style={{
                        background: item.gradient,
                        boxShadow: isActive ? `0 0 40px ${item.color}40` : "none",
                        fontSize: "clamp(1rem, 3vw, 1.5rem)", // حجم الأيقونة متجاوب
                      }}
                    >
                      {item.icon}
                    </div>
                    
                    {/* النص تحت الأيقونة للعنصر النشط */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 sm:mt-2 text-center"
                      >
                        <div className="text-white text-xs sm:text-sm font-bold whitespace-nowrap px-2 py-1 bg-black/30 rounded backdrop-blur-sm">
                          {item.title}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}

              {/* الدائرة المركزية - متجاوبة */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    background: activeItem.gradient,
                    boxShadow: `0 0 60px ${activeItem.color}60`,
                    width: "clamp(5rem, 15vw, 8rem)", // متجاوب: 80px-128px
                    height: "clamp(5rem, 15vw, 8rem)",
                    fontSize: "clamp(1.5rem, 5vw, 2.5rem)", // حجم الأيقونة متجاوب
                  }}
                  key={activeIndex}
                  initial={{ scale: 0.8, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <span>{activeItem.icon}</span>
                </motion.div>
              </div>
            </div>

            {/* مؤشرات التحكم */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 space-x-reverse">
              {galleryItems.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-white scale-125" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  onClick={() => handleItemClick(index)}
                />
              ))}
            </div>
          </div>

          {/* تفاصيل العنصر النشط */}
          <div className="flex-1 text-center lg:text-right px-4 lg:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="space-y-3 sm:space-y-4">
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white pb-2 sm:pb-4"
                    style={{
                      background: activeItem.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {activeItem.title}
                  </motion.h2>
                  
                  <motion.p
                    className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-semibold"
                  >
                    {activeItem.subtitle}
                  </motion.p>
                  
                  <motion.p
                    className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0"
                  >
                    {activeItem.description}
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <button
                    className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                    style={{
                      background: activeItem.gradient,
                      boxShadow: `0 10px 30px ${activeItem.color}30`,
                    }}
                  >
                    تعرف أكثر
                  </button>
                  
                  <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                    تواصل معنا
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-12">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors text-sm sm:text-base"
          >
            ←
          </button>
          
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold transition-all text-sm sm:text-base ${
              isAutoPlay 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isAutoPlay ? "إيقاف التلقائي" : "تشغيل تلقائي"}
          </button>
          
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % totalItems)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors text-sm sm:text-base"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircularGallery;