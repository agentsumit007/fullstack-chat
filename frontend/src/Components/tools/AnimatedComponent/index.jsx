import { motion } from "framer-motion";

function AnimatedWrapper({ children, initial, animate, exit, transition, className }) {
  return (
    <motion.div
      initial={initial || { opacity: 0, y: 20 }}
      animate={animate || { opacity: 1, y: 0 }}
      exit={exit || { opacity: 0, y: -20 }}
      transition={transition || { duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedWrapper;
