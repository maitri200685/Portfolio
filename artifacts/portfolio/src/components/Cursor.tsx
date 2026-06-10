import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function Cursor() {
  const cursorAnimation = useAnimation();
  const trailingAnimation = useAnimation();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let trailingX = 0;
    let trailingY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorAnimation.set({
        x: mouseX - 5,
        y: mouseY - 5,
      });
    };

    const animate = () => {
      trailingX += (mouseX - trailingX) * 0.15;
      trailingY += (mouseY - trailingY) * 0.15;

      trailingAnimation.set({
        x: trailingX - 16,
        y: trailingY - 16,
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [cursorAnimation, trailingAnimation]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={cursorAnimation}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998]"
        animate={trailingAnimation}
        transition={{ type: "spring", damping: 50, stiffness: 400 }}
      />
    </>
  );
}
