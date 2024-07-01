import { AnimationDefinition, motion } from "framer-motion";
import { ComponentType, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

export interface WithLayerProps<T> {
  isOpen?: boolean;
  onClose?: (value?: T) => void;
}

const variants = {
  open: {
    display: "flex",
    opacity: [0, 1],
    transition: { duration: 0.2 },
  },
  closed: {
    opacity: [1, 0],
    transition: { duration: 0.3 },
  },
};

export default function WithLayer<P, T>(
  WrappedComponent: ComponentType<WithLayerProps<T> & P>
) {
  const WrappedComponentRef = (props: WithLayerProps<T> & P) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const handleAnimated = useCallback(
      (animation: AnimationDefinition) =>
        animation === "open" && wrapRef.current?.focus(),
      []
    );
    return createPortal(
      <motion.div
        ref={wrapRef}
        className="z-10 fixed inset-0 flex-col hidden !h-auto"
        animate={props.isOpen ? "open" : "closed"}
        variants={variants}
        onAnimationComplete={handleAnimated}
      >
        <div tabIndex={0} className="flex items-center bg-white">
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
      </motion.div>,
      document.body
    );
  };

  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";
  WrappedComponentRef.displayName = `WithLayer(${componentName})`;

  return WrappedComponentRef;
}
