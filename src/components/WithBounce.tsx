import { ComponentType } from "react";
import { motion } from "framer-motion";

export interface WithBounceProps {
  isOpen?: boolean;
}

const variants = {
  open: {
    display: "block",
    opacity: [0, 1],
    scale: [0, 1],
    transition: { duration: 0.2 },
  },
  closed: {
    display: "none",
    opacity: [1, 0],
    scale: [1, 0],
    transition: { duration: 0.3 },
  },
};
export default function WithBounce<P>(
  WrappedComponent: ComponentType<WithBounceProps & P>
) {
  const WrappedComponentRef = (props: WithBounceProps & P) => {
    return (
      <motion.div
        animate={props.isOpen ? "open" : "closed"}
        variants={variants}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };

  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";
  WrappedComponentRef.displayName = `WithBounce(${componentName})`;

  return WrappedComponentRef;
}
