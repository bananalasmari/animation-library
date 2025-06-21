import {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
  } from "react";
  import { motion } from "framer-motion";
  
  const useMedia = (queries, values, defaultValue) => {
    const get = () =>
      values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  
    const [value, setValue] = useState(get);
  
    useEffect(() => {
      const handler = () => setValue(get);
      queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
      return () =>
        queries.forEach((q) =>
          matchMedia(q).removeEventListener("change", handler)
        );
    }, [queries]);
  
    return value;
  };
  
  const useMeasure = () => {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
  
    useLayoutEffect(() => {
      if (!ref.current) return;
      const ro = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      });
      ro.observe(ref.current);
      return () => ro.disconnect();
    }, []);
  
    return [ref, size];
  };
  
  const Masonry = ({
    items,
    ease = "power3.out",
    duration = 0.6,
    stagger = 0.05,
    animateFrom = "bottom",
    scaleOnHover = true,
    hoverScale = 0.95,
    blurToFocus = true,
    colorShiftOnHover = false,
  }) => {
    const columns = useMedia(
      [
        "(min-width:1500px)",
        "(min-width:1000px)",
        "(min-width:600px)",
        "(min-width:400px)",
      ],
      [5, 4, 3, 2],
      1
    );
  
    const [containerRef, { width }] = useMeasure();
    const [imagesReady, setImagesReady] = useState(true); // تم تعديلها لتكون true مباشرة
  
    const grid = useMemo(() => {
      if (!width) return [];
      const colHeights = new Array(columns).fill(0);
      const columnWidth = width / columns;
  
      return items.map((child) => {
        const col = colHeights.indexOf(Math.min(...colHeights));
        const x = columnWidth * col;
        const height = child.height || 200; // إضافة قيمة افتراضية
        const y = colHeights[col];
  
        colHeights[col] += height + 10; // إضافة مسافة بين العناصر
        return { ...child, x, y, w: columnWidth - 10, h: height }; // تقليل العرض للمسافات
      });
    }, [columns, items, width]);
  
    return (
      <div ref={containerRef} className="relative w-full min-h-screen bg-gray-900 p-4">
        {grid.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute cursor-pointer rounded-lg overflow-hidden shadow-xl"
            style={{
              left: item.x,
              top: item.y,
              width: item.w,
              height: item.h,
            }}
            initial={{
              opacity: 0,
              y: animateFrom === "bottom" ? 100 : animateFrom === "top" ? -100 : 0,
              x: animateFrom === "right" ? 100 : animateFrom === "left" ? -100 : 0,
              scale: 0.8,
              filter: blurToFocus ? "blur(10px)" : "blur(0px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.8,
              delay: index * stagger,
              ease: "easeOut",
            }}
            whileHover={{
              scale: scaleOnHover ? hoverScale : 1,
              transition: { duration: 0.3 },
            }}
            onClick={() => item.url && window.open(item.url, "_blank", "noopener")}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: item.img ? `url(${item.img})` : undefined,
                backgroundColor: item.color || "#6366f1",
              }}
            >
              {/* محتوى النص */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm opacity-90">{item.description}</p>
                  )}
                </div>
              </div>
  
              {/* تأثير تغيير اللون عند الهوفر */}
              {colorShiftOnHover && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-pink-500/50 to-sky-500/50"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };
  
  // مثال للاستخدام مع بيانات تجريبية
  export default function MasonryDemo() {
    // بيانات تجريبية
    const items = [
      {
        id: 1,
        title: "تصميم واجهات",
        description: "أفكار إبداعية للمواقع",
        height: 300,
        color: "#8B5CF6",
        url: "https://example.com"
      },
      {
        id: 2,
        title: "تطوير تطبيقات",
        description: "حلول تقنية متقدمة",
        height: 200,
        color: "#06B6D4",
      },
      {
        id: 3,
        title: "التصوير الفوتوغرافي",
        description: "لحظات مميزة",
        height: 400,
        color: "#F59E0B",
      },
      {
        id: 4,
        title: "الذكاء الاصطناعي",
        description: "مستقبل التكنولوجيا",
        height: 250,
        color: "#EF4444",
      },
      {
        id: 5,
        title: "التسويق الرقمي",
        description: "استراتيجيات فعالة",
        height: 350,
        color: "#10B981",
      },
      {
        id: 6,
        title: "تحليل البيانات",
        description: "رؤى ذكية للأعمال",
        height: 180,
        color: "#8B5CF6",
      },
      {
        id: 7,
        title: "الأمن السيبراني",
        description: "حماية متقدمة",
        height: 320,
        color: "#F97316",
      },
      {
        id: 8,
        title: "تجربة المستخدم",
        description: "تصميم يركز على المستخدم",
        height: 280,
        color: "#3B82F6",
      },
      {
        id: 9,
        title: "الحوسبة السحابية",
        description: "حلول مرنة وقابلة للتوسع",
        height: 240,
        color: "#84CC16",
      },
      {
        id: 10,
        title: "إنترنت الأشياء",
        description: "عالم متصل ذكي",
        height: 360,
        color: "#EC4899",
      }
    ];
  
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            معرض الأعمال التفاعلي
          </h1>
          
          <Masonry
            items={items}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={true}
          />
        </div>
      </div>
    );
  }