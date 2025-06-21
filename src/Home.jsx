// Home.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "./hooks/useScrollReveal";
import SplitText from "./components/SplitText";
import BeamsBackground from "./components/BeamsBackground";
import BlurText from "./components/BlurText";
import RotatingText from "./components/RotatingText";
import Masonry from './components/Masonry'

const Home = () => {
  const ref = useRef();
  useScrollReveal(ref, { direction: "up", duration: 600 });

  const features = [
    {
      icon: "🚀",
      title: "أداء عالي",
      description: "جميع الأنيميشن محسنة للأداء ولا تؤثر على سرعة التطبيق",
    },
    {
      icon: "🎨",
      title: "قابلة للتخصيص",
      description: "يمكنك تغيير الألوان والأحجام والسرعة بسهولة",
    },
    {
      icon: "📱",
      title: "متجاوبة",
      description: "تعمل بشكل مثالي على جميع الأجهزة والشاشات",
    },
    {
      icon: "⚡",
      title: "سهلة الاستخدام",
      description: "كود بسيط وواضح يمكن استخدامه مباشرة",
    },
    {
      icon: "🎯",
      title: "مجربة ومختبرة",
      description: "جميع المكونات مختبرة ومضمونة الجودة",
    },
    {
      icon: "🔧",
      title: "دعم كامل",
      description: "توثيق شامل وأمثلة واضحة للاستخدام",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        {/* خلفية الجزيئات */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <BlurText
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.2} // خليه أسرع شوي إذا تبي حركة أوضح
            particleBaseSize={150} // أكبر حجم للجزيئات
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* محتوى الهيرو فوق الخلفية */}
        <div className="relative z-10">
        <h1 ref={ref} className="text-6xl md:text-8xl font-bold mb-6 flex items-center justify-center whitespace-nowrap">
  <SplitText
    text="مكتبة "
    className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
  />
  <RotatingText />
</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-300">
            الرهيبة لـ React
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
            مجموعة من أروع التأثيرات والأشكال المتحركة الجاهزة للاستخدام في
            مشاريعك
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/animations"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              🚀 استكشف المكتبة
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            لماذا تختار مكتبتنا؟
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-cyan-400">
                  {feature.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            جاهز للبدء؟
          </h3>
          <p className="text-xl text-gray-400 mb-8">
            ابدأ في استخدام أروع الأشكال المتحركة في مشروعك الآن
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/animations"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              💫 ابدأ الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
