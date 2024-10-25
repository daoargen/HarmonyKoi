import { memo } from "react";
import { motion } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
};

const defaultAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const AnimatedText = memo(({ text, el: Wrapper = "p", className }: AnimatedTextProps) => {
  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>

      <motion.span
        aria-hidden
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
        initial="hidden"
        animate="visible"
      >
        {text.split("").map((char, charIndex) => (
          <motion.span
            key={`${char}-${charIndex}`}
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            variants={defaultAnimation}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
});

export default AnimatedText;
