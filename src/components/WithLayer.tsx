import { motion } from "framer-motion";
import { ComponentType } from "react";
import useDebounce from "./useDebounce";
export interface WithLayerProps {
  isOpen?: boolean;
}
const variants = {
  open: {
    opacity: [0, 100],
    scale: [0, 1],
  },
  closed: {
    opacity: [100, 0],
    scale: [1, 0],
  },
};
export default function WithLayer<P>(
  WrappedComponent: ComponentType<WithLayerProps & P>
) {
  const WrappedComponentRef = (props: WithLayerProps & P) => {
    const debouncedIsOpen = useDebounce(props.isOpen, 500); // 100ms debounce delay
    console.log(debouncedIsOpen);
    return (
      <motion.div
        className="fixed inset-0 !h-auto"
        animate={debouncedIsOpen ? "open" : "closed"}
        variants={variants}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };
  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";
  WrappedComponentRef.displayName = `WithLayer(${componentName})`;

  return WrappedComponentRef;
}
