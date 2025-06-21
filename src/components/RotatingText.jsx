import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // تحسين دالة تقسيم النص للعربية
  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("ar", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];

    // للنص العربي، نستخدم تقسيم الكلمات بدلاً من الحروف
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: [word], // نحتفظ بالكلمة كاملة
        needsSpace: i !== words.length - 1,
      }));
    }

    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }

    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }

    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getStaggerDelay = useCallback(
    (index, totalElements) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last")
        return (totalElements - 1 - index) * staggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(totalElements / 2);
        return Math.abs(center - index) * staggerDuration;
      }
      if (staggerFrom === "end")
        return (totalElements - 1 - index) * staggerDuration;
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * totalElements);
        return Math.abs(randomIndex - index) * staggerDuration;
      }
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset]
  );

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span
      className={cn(
        "flex flex-wrap whitespace-pre-wrap relative",
        mainClassName
      )}
      {...rest}
      layout
      transition={transition}
      dir="rtl" // إضافة دعم اتجاه النص العربي
      style={{ fontFeatureSettings: "'liga' 1, 'calt' 1" }} // تفعيل ربط الحروف
    >
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence
        mode={animatePresenceMode}
        initial={animatePresenceInitial}
      >
        <motion.div
          key={currentTextIndex}
          className={cn(
            splitBy === "lines"
              ? "flex flex-col w-full"
              : "flex flex-wrap whitespace-pre-wrap relative"
          )}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={initial}
              animate={animate}
              exit={exit}
              transition={{
                ...transition,
                delay: getStaggerDelay(wordIndex, elements.length),
              }}
              className={cn(
                "inline-block",
                elementLevelClassName,
                splitLevelClassName
              )}
              style={{
                fontFeatureSettings: "'liga' 1, 'calt' 1",
                textRendering: "optimizeLegibility",
              }}
            >
              {wordObj.characters[0]}
              {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = "RotatingText";

// مثال للاستخدام
export default function ArabicRotatingTextDemo() {
  return (
    <div className=" bg-gray-900 flex items-center justify-center p-8">
      <div className="text-center space-y-8">

        {/* المثال الأساسي */}
        <RotatingText
          texts={["انميشن", "تأثيرات", "توهج"]}
          mainClassName="w-[400px] h-[100px] text-6xl bg-purple-600 text-white overflow-hidden justify-center rounded-lg flex items-center font-bold"
          staggerFrom="end"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />

        {/* مثال بنصوص أطول */}
        {/* <RotatingText
          texts={["انميشن", "تأثيرات", "أمثله"]}
          mainClassName="w-[500px] h-[100px] text-4xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden justify-center rounded-lg flex items-center font-semibold"
          staggerFrom="center"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          staggerDuration={0.1}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          rotationInterval={3000}
        /> */}

        {/* مثال بتأثير مختلف */}
        {/* <RotatingText
          texts={["انميشن", "تأثيرات", "أمثله"]}
          mainClassName="w-[350px] h-[120px] text-5xl bg-green-600 text-white overflow-hidden justify-center rounded-lg flex items-center font-bold"
          staggerFrom="first"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          staggerDuration={0.05}
          transition={{ type: "spring", damping: 20, stiffness: 500 }}
          rotationInterval={2500}
          splitBy="words"
        /> */}
      </div>
    </div>
  );
}
