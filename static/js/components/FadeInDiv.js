import { AnimatePresence, motion } from "framer-motion";

export default function FadeInDiv({ show, children, ...otherProps }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            y: -20,
            // scale: 0.9,
            opacity: 0,
          }}
          animate={{
            y: 0,
            // scale: 1,
            opacity: 1,
          }}
          exit={{
            y: -20,
            // scale: 0.9,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            duration: 0.25,
            bounce: 0.05,
          }}
          className="about-container"
          {...otherProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
