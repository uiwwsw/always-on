import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Layer({
  children,
  open,
}: {
  children?: ReactNode;
  open?: boolean;
}) {
  return (
    open && (
      <motion.div
        className="fixed inset-0 !h-auto"
        animate={{
          opacity: [0, 100],
          scale: [0, 1],
        }}
      >
        {children}
      </motion.div>
    )
  );
}
