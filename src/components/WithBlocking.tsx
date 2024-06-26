import { motion } from "framer-motion";
import { ComponentType, useEffect, useState } from "react";

export interface WithBlockingProps {
  isOpen?: boolean;
  onClose?: (value?: unknown) => void;
}

const variants = {
  open: {
    display: "block",
    opacity: [0, 1],
    transition: { duration: 0.2 },
  },
  closed: {
    display: "none",
    opacity: [1, 0],
    transition: { duration: 0.3 },
  },
};

export default function WithBlocking<P>(
  WrappedComponent: ComponentType<WithBlockingProps & P>,
  delay: number = 1000
) {
  const WrappedComponentRef = (props: WithBlockingProps & P) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (props.isOpen) {
        setIsVisible(true);
      } else {
        const timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, delay);
        return () => clearTimeout(timeoutId);
      }
    }, [props.isOpen]);

    return (
      <motion.div
        className="z-10 fixed inset-0 hidden !h-auto"
        animate={isVisible ? "open" : "closed"}
        variants={variants}
      >
        <div className="flex items-center bg-white">
          <button className="ml-auto p-4" onClick={() => props.onClose?.()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
        <WrappedComponent {...props} />
      </motion.div>
    );
  };

  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";
  WrappedComponentRef.displayName = `WithBlocking(${componentName})`;

  return WrappedComponentRef;
}
