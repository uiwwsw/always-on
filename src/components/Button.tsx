import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Button({ children }: { children?: ReactNode }) {
  return <motion.button>{children}</motion.button>;
}
