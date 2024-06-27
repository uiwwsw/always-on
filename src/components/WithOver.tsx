import { AnimationDefinition, motion } from "framer-motion";
import { ComponentType, useState, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import ButtonWithTheme from "./Button";

export interface WithOverProps {
  onClose?: () => void;
}

const variants = {
  open: {
    display: "block",
    opacity: [0, 1],
    transition: { duration: 0.2 },
  },
  closed: {
    opacity: [1, 0],
    transition: { duration: 0.3 },
  },
};

export default function WithOver<P>(
  WrappedComponent: ComponentType<WithOverProps & P>,
  btn: ReactNode
) {
  const WrappedComponentRef = (props: WithOverProps & P) => {
    const [buttonPosition, setButtonPosition] = useState<DOMRect | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const sto = useRef<number>(0);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleButtonClick = () => {
      if (buttonRef.current && wrapRef.current) {
        setButtonPosition(buttonRef.current.getBoundingClientRect());
        setIsOpen(true);
      }
    };

    const handleClose = () => {
      sto.current = setTimeout(() => setIsOpen(false), 0);
    };
    const handleCancelClose = () => clearTimeout(sto.current);
    const handleAnimated = (animation: AnimationDefinition) => {
      if (animation === "open") wrapRef.current?.focus();
    };

    const computePositionStyles = () => {
      if (!buttonPosition) return undefined;
      const { top, left, width, height } = buttonPosition;
      const horizontalCenter = left + width / 2;
      const verticalCenter = top + height / 2;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const isRight = horizontalCenter > windowWidth / 2;
      const isBottom = verticalCenter > windowHeight / 2;
      return {
        top: isBottom ? "auto" : `${top + height}px`,
        bottom: isBottom ? `${windowHeight - top}px` : "auto",
        left: isRight ? "auto" : `${left}px`,
        right: isRight ? `${windowWidth - (left + width)}px` : "auto",
      };
    };

    return (
      <>
        <span className="[&>*]:min-w-0">
          <ButtonWithTheme
            size="sm"
            ref={buttonRef}
            onClick={handleButtonClick}
          >
            {btn}
          </ButtonWithTheme>
        </span>
        {createPortal(
          <motion.div
            ref={wrapRef}
            tabIndex={0}
            onAnimationComplete={handleAnimated}
            onBlur={handleClose}
            onFocusCapture={handleCancelClose}
            className="z-10 absolute hidden"
            style={computePositionStyles()}
            animate={isOpen ? "open" : "closed"}
            variants={variants}
          >
            <WrappedComponent {...props} onClose={handleClose} />
          </motion.div>,
          document.body
        )}
      </>
    );
  };

  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";
  WrappedComponentRef.displayName = `WithOver(${componentName})`;

  return WrappedComponentRef;
}
