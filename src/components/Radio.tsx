import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default function Radio({ children }: { children?: string }) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);
  return (
    <div className="inline-flex items-center gap-2" onClick={toggleSwitch}>
      <span>{children}</span>
      <div
        className={clsx(
          "flex justify-start p-1 rounded-full w-12 h-8 transition-colors",
          isOn ? "bg-blue-500" : "bg-slate-300",
          {
            "justify-end": isOn,
          }
        )}
      >
        <motion.div
          className="bg-white rounded-full w-6 h-6"
          layout
          transition={spring}
        />
      </div>
    </div>
  );
}
