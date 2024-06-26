import { ComponentType, useEffect, useState } from "react";

export interface WithSmoothProps {
  isOpen?: boolean;
}

export default function WithSmooth<P>(
  WrappedComponent: ComponentType<WithSmoothProps & P>,
  delay: number = 1000
) {
  const WrappedComponentRef = (props: WithSmoothProps & P) => {
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

    return <WrappedComponent {...props} isOpen={isVisible} />;
  };

  const componentName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component";
  WrappedComponentRef.displayName = `WithSmooth(${componentName})`;

  return WrappedComponentRef;
}
