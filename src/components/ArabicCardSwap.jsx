import React, { useState } from 'react';

const ArabicCardSwap = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-arabic">
          بطاقة تفاعلية
        </h1>
        <p className="text-xl text-purple-200 font-arabic">
          اضغط على البطاقة لتراها تتحرك
        </p>
      </div>

      <div className="relative w-80 h-96 perspective-1000">
        <div 
          className={`absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* الوجه الأمامي */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-6 shadow-2xl border border-white/20">
            <div className="h-full flex flex-col justify-between text-white">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 font-arabic">مرحباً بك</h2>
                <p className="text-lg opacity-90 font-arabic">استكشف المحتوى المخفي</p>
              </div>
              
              <div className="text-center">
                <div className="w-full h-1 bg-white/30 rounded-full mb-4">
                  <div className="w-3/4 h-1 bg-white rounded-full"></div>
                </div>
                <p className="text-sm opacity-75 font-arabic">اضغط للكشف عن المزيد</p>
              </div>
            </div>
          </div>

          {/* الوجه الخلفي */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 shadow-2xl border border-white/20">
            <div className="h-full flex flex-col justify-between text-white">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 font-arabic">تم الكشف!</h2>
                <p className="text-lg opacity-90 font-arabic">المحتوى السري هنا</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <p className="font-arabic">معلومة مهمة أولى</p>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <p className="font-arabic">معلومة مهمة ثانية</p>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <p className="font-arabic">معلومة مهمة ثالثة</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm opacity-75 font-arabic">اضغط مرة أخرى للعودة</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مؤشر الحالة */}
      <div className="mt-8 flex space-x-2 space-x-reverse">
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${!isFlipped ? 'bg-white' : 'bg-white/30'}`}></div>
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isFlipped ? 'bg-white' : 'bg-white/30'}`}></div>
      </div>

      {/* تأثيرات إضافية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap');
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .font-arabic {
          font-family: 'Almarai', 'Al Marai', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 600;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ArabicCardSwap;